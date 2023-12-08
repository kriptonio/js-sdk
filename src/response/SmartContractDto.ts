export interface SmartContractDto {
  id: string;
  title: string;
  abi: string;
  blockchain: {
    chainId: number;
  };
  wallet: {
    id: string;
  };
  deployment?: {
    address: string;
  };
}
