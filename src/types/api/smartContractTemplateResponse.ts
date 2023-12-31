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
import type { TemplateInputSchemaResponse } from './templateInputSchemaResponse';
import type { SmartContractType } from './smartContractType';


export interface SmartContractTemplateResponse { 
    id: string;
    title: string;
    subtitle: string;
    inputSchema: TemplateInputSchemaResponse;
    type: SmartContractType;
}
export namespace SmartContractTemplateResponse {
}


