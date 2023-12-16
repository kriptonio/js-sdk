import { JsonRpcError } from './types/api/jsonRpcError';

interface ErrorInfo {
  code?: number;
  message?: string;
  cause?: ErrorInfo;
}

export class KriptonioError extends Error {
  public code: number | undefined;
  public cause: KriptonioError | undefined;

  public constructor(error: ErrorInfo) {
    super(error.message);
    this.code = error.code;

    if (error.cause) {
      this.cause = new KriptonioError(error.cause);
    }
  }

  public static fromJsonRpcError = (error: JsonRpcError): KriptonioError => {
    return new KriptonioError({
      code: error.code,
      message: error.message ?? undefined,
      cause: error.data?.cause
        ? KriptonioError.fromJsonRpcError(error.data.cause)
        : undefined,
    });
  };
}
