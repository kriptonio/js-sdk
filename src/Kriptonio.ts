import { Configuration } from './Configuration';
import { SmartContract } from './SmartContract';
import { Wallet } from './Wallet';
import { ApiClient, AuthenticationData } from './api/ApiClient';

export class KriptonioClient {
  #apiClient: ApiClient;
  public readonly wallet: Wallet;
  public readonly smartContract: SmartContract;

  constructor(accessToken: string) {
    this.#apiClient = new ApiClient({ accessToken });
    this.wallet = new Wallet(this.#apiClient);
    this.smartContract = new SmartContract(this.#apiClient);
  }

  public configure = (
    config: AuthenticationData & {
      apiUrl?: string;
    }
  ) => {
    this.#apiClient.setAuthentication(config);

    if (config.apiUrl) {
      Configuration.apiUrl = config.apiUrl;
    }
  };

  static withClient = (apiClient: ApiClient): KriptonioClient => {
    const client = new KriptonioClient(null!);
    client.#apiClient = apiClient;
    return client;
  };
}
