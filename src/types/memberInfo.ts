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
import type { CustomAttributeData } from './customAttributeData';
import type { Type } from './type';
import type { Module } from './module';
import type { MemberTypes } from './memberTypes';

export interface MemberInfo {
  memberType?: MemberTypes;
  readonly name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  readonly customAttributes?: Array<CustomAttributeData> | null;
  readonly isCollectible?: boolean;
  readonly metadataToken?: number;
}
export namespace MemberInfo {}
