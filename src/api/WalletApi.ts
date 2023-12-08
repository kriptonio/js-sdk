import { KriptonioError } from '../Error';
import { WalletDto } from '../response/WalletDto';
import { CreateWalletBody } from '../types/createWalletBody';
import { WalletResponse } from '../types/walletResponse';
import { AccessTokenApi } from './AccessTokenApi';
import { ApiClient } from './ApiClient';

export class WalletApi {
  #apiClient: ApiClient;
  #accessTokenApi: AccessTokenApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#accessTokenApi = new AccessTokenApi(apiClient);
  }

  public get = async (id: string): Promise<WalletDto> => {
    const response = await this.#apiClient.get<WalletResponse>(
      `/v1/wallets/${id}`
    );

    if (response.ok) {
      return this.createDto(response.data);
    }

    throw new KriptonioError({
      message: `Error while fetching wallet with id ${id}. ${response.error.stringify()}`,
    });
  };

  public create = async (data: CreateWalletBody): Promise<WalletDto> => {
    const accessToken = await this.#accessTokenApi.get();

    const response = await this.#apiClient.post<WalletResponse>(
      `/v1/organizations/${accessToken.organizationId}/wallets`,
      {
        data,
      }
    );

    if (response.ok) {
      return this.createDto(response.data);
    }

    throw new KriptonioError({
      message: `Error while creating wallet. ${response.error.stringify()}`,
    });
  };

  private createDto = (response: WalletResponse): WalletDto => {
    return {
      id: response.id,
      title: response.title,
      type: response.type,
      address: response.address,
      paymasterEnabled: response.paymasterEnabled,
    };
  };
}
