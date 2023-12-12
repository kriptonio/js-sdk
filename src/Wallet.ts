import { KriptonioSigner } from './Signer';
import { ApiClient } from './api/ApiClient';
import { WalletApi } from './api/WalletApi';
import { CreateWalletBody } from './types/api/createWalletBody';

export interface WalletSignerOptions {
  walletId: string;
  chainId: number;
  walletPassword?: string;
}

export class Wallet {
  #apiClient: ApiClient;
  #walletApi: WalletApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#walletApi = new WalletApi(apiClient);
  }

  public create = (data: CreateWalletBody) => {
    return this.#walletApi.create(data);
  };

  public signer = async (opts: WalletSignerOptions) => {
    const wallet = await this.#walletApi.get(opts.walletId);
    return new KriptonioSigner(
      {
        chainId: opts.chainId,
        walletId: wallet.id,
        walletPassword: opts.walletPassword,
      },
      this.#apiClient
    );
  };
}
