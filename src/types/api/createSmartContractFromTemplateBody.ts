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


export interface CreateSmartContractFromTemplateBody { 
    title: string;
    blockchainId: string;
    walletId: string;
    contract: string;
    smartContractTemplateId: string;
    templateInput: any | null;
}
