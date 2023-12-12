import { WalletType } from '../types/api/walletType';

export interface WalletDto {
  id: string;
  title: string;
  address: string;
  type: WalletType;
  paymasterEnabled: boolean;
}
