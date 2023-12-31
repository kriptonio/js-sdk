/**
 * Kriptonio Private API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: private
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import type { WalletType } from './walletType';
import type { WalletPaymasterResponse } from './walletPaymasterResponse';


export interface WalletResponse { 
    id: string;
    title: string;
    address: string;
    type: WalletType;
    color: string;
    paymasterEnabled: boolean;
    organizationId: string;
    paymasters?: Array<WalletPaymasterResponse> | null;
    createdAt: string;
}
export namespace WalletResponse {
}


