/* eslint-disable @typescript-eslint/no-unused-vars */
import * as ethers from 'ethers';
import { Configuration } from './Configuration';
import { KriptonioError } from './Error';
import { ApiClient } from './api/ApiClient';
import { WalletApi } from './api/WalletApi';
import { WalletDto } from './response/WalletDto';
import { JsonRpcResponse } from './types/api/jsonRpcResponse';
import { WalletType } from './types/api/walletType';

export interface SignerOptions {
  walletId: string;
  chainId: number;
  walletPassword?: string;
  smartContractId?: string;
}

export interface UserOperation {
  from?: string | ethers.Addressable | null;
  to?: string | ethers.Addressable | null;
  value?: string | number;
  data?: string | null;
}

interface UserOperationReceipt {
  success: boolean;
  reason: string;
  receipt: {
    transactionHash: string;
  };
}

interface UserOperationEstimation {
  preVerificationGas: bigint;
  verificationGasLimit: bigint;
  callGasLimit: bigint;
}

export class KriptonioSigner extends ethers.AbstractSigner<ethers.JsonRpcProvider> {
  #walletId: string;
  #walletPassword: string | null = null;
  #chainId: number;
  #wallet: WalletDto | null = null;
  #walletApi: WalletApi;
  #apiClient: ApiClient;
  #rpcUrl: string;

  constructor(opts: SignerOptions, apiClient: ApiClient) {
    let rpcUrl = '';

    if (opts.smartContractId) {
      rpcUrl = `${Configuration.apiUrl}/v1/smart-contracts/${opts.smartContractId}/rpc`;
    } else {
      rpcUrl = `${Configuration.apiUrl}/v1/wallets/${opts.walletId}/blockchains/${opts.chainId}/rpc`;
    }
    const fetchRequest = new ethers.FetchRequest(rpcUrl);

    if (apiClient.authenticationHeader) {
      fetchRequest.setHeader(
        apiClient.authenticationHeader.key,
        apiClient.authenticationHeader.value
      );
    }

    const provider = new ethers.JsonRpcProvider(fetchRequest, opts.chainId);
    super(provider);

    this.#rpcUrl = rpcUrl;
    this.#walletId = opts.walletId;
    this.#walletPassword = opts.walletPassword ?? null;
    this.#chainId = opts.chainId;
    this.#apiClient = apiClient;
    this.#walletApi = new WalletApi(apiClient);
  }

  public async getAddress(): Promise<string> {
    const wallet = await this.getWallet();
    return wallet.address;
  }

  public connect(_: ethers.ethers.Provider | null): ethers.ethers.Signer {
    throw new KriptonioError({
      message: 'Attaching custom provider not supported currently',
    });
  }

  public signTransaction(
    tx: ethers.ethers.TransactionRequest
  ): Promise<string> {
    return this.rpc<string>('eth_signTransaction', [tx]);
  }

  public async signMessage(message: string | Uint8Array): Promise<string> {
    const wallet = await this.getWallet();
    return this.rpc<string>('personal_sign', [message, wallet.address]);
  }

  public async estimateGas(tx: ethers.TransactionRequest): Promise<bigint> {
    const wallet = await this.getWallet();

    if (wallet.type === WalletType.Eoa) {
      return checkProvider(this, 'estimateGas').estimateGas(
        await this.populateCall(tx)
      );
    } else if (wallet.type === WalletType.SmartWallet) {
      const resolved = await ethers.resolveProperties(tx);

      const estimation = await this.estimateUserOperationGas({
        from: resolved.from,
        to: resolved.to,
        value: resolved.value?.toString(),
        data: resolved.data,
      });

      const total =
        estimation.preVerificationGas +
        estimation.verificationGasLimit +
        estimation.callGasLimit;

      return total;
    } else {
      throw new KriptonioError({ message: 'Unsupported wallet type' });
    }
  }

  public async estimateUserOperationGas(userOp: UserOperation) {
    const wallet = await this.getWallet();
    if (wallet.type !== WalletType.SmartWallet) {
      throw new KriptonioError({
        message: 'Only smart wallet can estimate user operations',
      });
    }

    const estimation = await this.rpc<UserOperationEstimation>(
      'eth_estimateUserOperationGas',
      [userOp]
    );

    return {
      preVerificationGas: BigInt(estimation.preVerificationGas),
      verificationGasLimit: BigInt(estimation.verificationGasLimit),
      callGasLimit: BigInt(estimation.callGasLimit),
    };
  }

  public async sendTransaction(
    tx: ethers.ethers.TransactionRequest
  ): Promise<ethers.ethers.TransactionResponse> {
    const provider = checkProvider(this, 'sendTransaction');
    const wallet = await this.getWallet();

    if (wallet.type === WalletType.Eoa) {
      try {
        const pop = await this.populateTransaction(tx);
        delete pop.from;

        const txObj = ethers.Transaction.from(pop);
        return await provider.broadcastTransaction(
          await this.signTransaction(txObj)
        );
      } catch (e) {
        const ethersError = e as ethers.EthersError;
        if (ethersError.code && ethersError.shortMessage) {
          throw new KriptonioError({
            message: `${ethersError.code}: ${ethersError.shortMessage}`,
          });
        }

        throw e;
      }
    } else if (wallet.type === WalletType.SmartWallet) {
      const resolved = await ethers.resolveProperties(tx);

      const userOpHash = await this.sendUserOperation({
        from: resolved.from,
        to: resolved.to,
        value: resolved.value?.toString(),
        data: resolved.data,
      });

      const receipt = await this.waitUserOperationReceipt(userOpHash);
      if (!receipt) {
        throw new KriptonioError({
          message: 'User operation receipt not found',
        });
      }

      if (!receipt.success) {
        throw new KriptonioError({
          message: `User operation failed: ${receipt.reason ?? 'No details'}`,
        });
      }

      const userOpTx = await provider.getTransaction(
        receipt.receipt.transactionHash
      );

      if (!userOpTx) {
        throw new KriptonioError({
          message: 'Transaction not found, but operation succeeded',
        });
      }

      return userOpTx;
    } else {
      throw new KriptonioError({ message: 'Unsupported wallet type' });
    }
  }

  private waitUserOperationReceipt = async (userOpHash: string) => {
    const iterations = 70;
    const interval = 1000;

    for (let i = 0; i < iterations; i++) {
      const result = await this.getUserOperationReceipt(userOpHash);

      if (result) {
        return result;
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  };

  private getUserOperationReceipt = async (userOpHash: string) => {
    try {
      return (await this.provider?.send('eth_getUserOperationReceipt', [
        userOpHash,
      ])) as UserOperationReceipt | null;
    } catch (e) {
      if ((e as { error?: { code?: number } })?.error?.code === -32601) {
        return null;
      }

      throw e;
    }
  };

  public async sendUserOperation(userOp: UserOperation): Promise<string> {
    const wallet = await this.getWallet();
    if (wallet.type !== WalletType.SmartWallet) {
      throw new KriptonioError({
        message: 'Only smart wallet can send user operations',
      });
    }

    return this.rpc<string>('eth_sendUserOperation', [userOp]);
  }

  public async signTypedData(
    domain: ethers.ethers.TypedDataDomain,
    types: Record<string, ethers.ethers.TypedDataField[]>,
    message: Record<string, unknown>
  ): Promise<string> {
    const wallet = await this.getWallet();
    return this.rpc<string>('eth_signTypedData_v4', [
      wallet?.address,
      {
        domain,
        types,
        message,
      },
    ]);
  }

  private getWallet = async (): Promise<WalletDto> => {
    if (!this.#wallet) {
      this.#wallet = await this.#walletApi.get(this.#walletId);
    }

    return this.#wallet;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async rpc<TResult = any>(
    method: string,
    params: unknown[]
  ): Promise<TResult> {
    const data = {
      id: new Date().getTime(),
      jsonrpc: '2.0',
      method,
      params,
      walletPassword: this.#walletPassword,
    };

    const response = await this.#apiClient.post<JsonRpcResponse>(this.#rpcUrl, {
      data,
    });

    if (response.ok) {
      if (response.data.error) {
        throw new KriptonioError({
          code: response.data.error.code,
          message: response.data.error.message ?? undefined,
          cause: response.data.error.data?.cause ?? undefined,
        });
      }

      return response.data.result as TResult;
    }

    throw new KriptonioError({
      message: `Error while calling RPC method ${method} on chain ${
        this.#chainId
      }. ${response.error.stringify()}`,
    });
  }
}

function checkProvider(
  signer: ethers.AbstractSigner,
  operation: string
): ethers.Provider {
  if (signer.provider) {
    return signer.provider;
  }

  ethers.assert(false, 'missing provider', 'UNSUPPORTED_OPERATION', {
    operation,
  });
}
