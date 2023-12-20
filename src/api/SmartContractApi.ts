import { KriptonioError } from '../Error';
import { SmartContractDto } from '../response/SmartContractDto';
import { SmartContractDetailResponse } from '../types/api/smartContractDetailResponse';
import { ApiClient } from './ApiClient';
import { BlockchainApi } from './BlockchainApi';

export class SmartContractApi {
  #apiClient: ApiClient;
  #blockchainApi: BlockchainApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#blockchainApi = new BlockchainApi(apiClient);
  }

  public get = async (id: string): Promise<SmartContractDto> => {
    const smartContract =
      await this.#apiClient.get<SmartContractDetailResponse>(
        `/v1/smart-contracts/${id}`
      );

    if (smartContract.ok) {
      const blockchain = await this.#blockchainApi.get(
        smartContract.data.blockchainId
      );

      return {
        id: smartContract.data.id,
        title: smartContract.data.title,
        abi: smartContract.data.abi,
        blockchain,
        wallet: {
          id: smartContract.data.wallet.id,
        },
        deployment: smartContract.data.deployment
          ? {
              address: smartContract.data.deployment.address,
            }
          : undefined,
      };
    }

    throw new KriptonioError({
      message: `Error while fetching smart contract with id ${id}. ${smartContract.error.stringify()}`,
    });
  };
}
