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
import type { ExternalServiceError } from './externalServiceError';
import type { ApiErrorCode } from './apiErrorCode';


export interface ApiErrorResponse { 
    code: ApiErrorCode;
    message?: string | null;
    cause?: ExternalServiceError;
}
export namespace ApiErrorResponse {
}

