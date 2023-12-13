interface ErrorInfo {
  code?: number;
  message?: string;
  cause?: ErrorInfo;
}

export class KriptonioError extends Error {
  public code: number | undefined;
  public cause: ErrorInfo | undefined;

  constructor(error: ErrorInfo) {
    super(error.message);
    this.code = error.code;
    this.cause = error.cause;
  }
}
