import { KriptonioError } from '../Error';
import { BlockchainDto } from '../response/BlockchainDto';
import { BlockchainResponse } from '../types/api/blockchainResponse';
import { ApiClient } from './ApiClient';

export class BlockchainApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public get = async (id: string): Promise<BlockchainDto> => {
    const response = await this.#apiClient.get<BlockchainResponse>(
      `/v1/blockchains/${id}`
    );

    if (response.ok) {
      return {
        id: response.data.id,
        chainId: response.data.chainId,
      };
    }

    throw new KriptonioError({
      message: `Error while fetching blockchain with id ${id}. ${response.error.stringify()}`,
    });
  };
}
