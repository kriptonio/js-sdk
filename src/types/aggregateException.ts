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
import type { MethodBase } from './methodBase';
import type { Exception } from './exception';

export interface AggregateException {
  targetSite?: MethodBase;
  readonly data?: { [key: string]: any } | null;
  innerException?: Exception;
  helpLink?: string | null;
  source?: string | null;
  hResult?: number;
  readonly stackTrace?: string | null;
  readonly innerExceptions?: Array<Exception> | null;
  readonly message?: string | null;
}
