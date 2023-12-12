import { ApiErrorCode } from '../types/api/apiErrorCode';
import { ApiErrorResponse } from '../types/api/apiErrorResponse';
import { ExternalServiceError } from '../types/api/externalServiceError';

export class ApiErrorModel {
  public message: string | null = null;

  public code: ApiErrorCode | null = null;

  private cause: ExternalServiceError | null = null;

  public stringify = (): string => {
    const parts: string[] = [];

    if (this.code) {
      parts.push(`[${this.code}]`);
    }

    if (this.message) {
      parts.push(this.message);
    }

    const rootCause = this.getRootCause(this.cause);
    if (rootCause) {
      parts.push('caused by');

      if (rootCause.code) {
        parts.push(`[${rootCause.code}]`);
      }

      if (rootCause.message) {
        parts.push(rootCause.message);
      }
    }

    return parts.join(' ');
  };

  public get rootCause(): ExternalServiceError | null {
    return this.getRootCause(this.cause);
  }

  private getRootCause = (
    error: ExternalServiceError | null
  ): ExternalServiceError | null => {
    if (!error) {
      return null;
    }

    if (error.cause) {
      return this.getRootCause(error.cause);
    }

    return error;
  };

  public static from = (dto: ApiErrorResponse) => {
    const model = new ApiErrorModel();

    model.message = dto.message ?? null;
    model.code = dto.code;
    model.cause = dto.cause ?? null;

    return model;
  };
}
