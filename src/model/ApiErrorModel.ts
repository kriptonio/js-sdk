import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../types/apiErrorResponse';
import { ErrorCode } from '../types/errorCode';

export class ApiErrorModel {
  public httpStatusCode: number | null = null;

  public details: string | null = null;

  public code: ErrorCode | null = null;

  public subCode: string | null = null;

  public hasCodeOrSubCode = (code: ErrorCode): boolean => {
    return this.code === code || this.subCode === code;
  };

  public stringify = (): string => {
    let code = this.code ?? '';
    if (this.subCode) {
      code = `${code}.${this.subCode}`;
    }

    if (this.details && !code) {
      return this.details;
    }

    if (code && !this.details) {
      return code;
    }

    if (this.code && this.details) {
      return `${this.details} (Code: ${code})`;
    }

    return this.httpStatusCode?.toString() ?? '';
  };

  public static from = (error: AxiosError<ApiErrorResponse>) => {
    const model = new ApiErrorModel();

    model.httpStatusCode = error.response?.status ?? null;
    model.details = error.response?.data?.details ?? null;
    model.code = error.response?.data?.code ?? null;
    model.subCode = error.response?.data?.subCode ?? null;

    return model;
  };
}
