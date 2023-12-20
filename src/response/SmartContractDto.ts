import { BlockchainDto } from './BlockchainDto';

export interface SmartContractDto {
  id: string;
  title: string;
  abi: string;
  blockchain: BlockchainDto;
  wallet: {
    id: string;
  };
  deployment?: {
    address: string;
  };
}
