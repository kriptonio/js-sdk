import { KriptonioSigner } from './Signer';
import { ApiClient } from './api/ApiClient';
import { SmartContractApi } from './api/SmartContractApi';

export interface SmartContractSignerOptions {
  walletPassword?: string;
  smartContractId: string;
}

export class SmartContract {
  #apiClient: ApiClient;
  #smartContractApi: SmartContractApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#smartContractApi = new SmartContractApi(apiClient);
  }

  public get = (id: string) => {
    return this.#smartContractApi.get(id);
  };

  public signer = async (opts: SmartContractSignerOptions) => {
    const smartContract = await this.#smartContractApi.get(
      opts.smartContractId
    );

    return new KriptonioSigner(
      {
        chainId: smartContract.blockchain.chainId,
        walletId: smartContract.wallet.id,
        smartContractId: smartContract.id,
        walletPassword: opts.walletPassword,
      },
      this.#apiClient
    );
  };
}
