import { KriptonioError } from '../Error';
import { SmartContractDto } from '../response/SmartContractDto';
import { SmartContractDetailResponse } from '../types/smartContractDetailResponse';
import { ApiClient } from './ApiClient';

export class SmartContractApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public get = async (id: string): Promise<SmartContractDto> => {
    const response = await this.#apiClient.get<SmartContractDetailResponse>(
      `/v1/smart-contracts/${id}`
    );

    if (response.ok) {
      return {
        id: response.data.id,
        title: response.data.title,
        abi: response.data.abi,
        blockchain: {
          chainId: response.data.blockchain.chainId,
        },
        wallet: {
          id: response.data.wallet.id,
        },
        deployment: response.data.deployment
          ? {
              address: response.data.deployment.address,
            }
          : undefined,
      };
    }

    throw new KriptonioError({
      message: `Error while fetching smart contract with id ${id}. ${response.error.stringify()}`,
    });
  };
}
