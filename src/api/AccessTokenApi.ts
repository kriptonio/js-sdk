import { KriptonioError } from '../Error';
import { AccessTokenDto } from '../response/AccessTokenDto';
import { AccessTokenResponse } from '../types/api/accessTokenResponse';
import { ApiClient } from './ApiClient';

export class AccessTokenApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public get = async (): Promise<AccessTokenDto> => {
    if (!this.#apiClient.accessToken) {
      throw new KriptonioError({ message: 'Access token is not set' });
    }

    const response = await this.#apiClient.get<AccessTokenResponse>(
      `/v1/access-tokens/${this.#apiClient.accessToken}`
    );

    if (response.ok) {
      return {
        organizationId: response.data.organizationId,
      };
    }

    throw new KriptonioError({
      message: `Error while fetching access token. ${response.error.stringify()}`,
    });
  };
}
