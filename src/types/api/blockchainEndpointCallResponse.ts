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
import type { EndpointCallStatus } from './endpointCallStatus';


export interface BlockchainEndpointCallResponse { 
    requestBody?: string | null;
    method?: string | null;
    errorMessage?: string | null;
    errorCode?: number | null;
    status: EndpointCallStatus;
    httpCode: number;
    createdAt: string;
}
export namespace BlockchainEndpointCallResponse {
}


