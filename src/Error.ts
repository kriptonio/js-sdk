interface ErrorInfo {
  code?: number;
  message?: string;
}

export class KriptonioError extends Error {
  public code: number | undefined;

  constructor(error: ErrorInfo) {
    super(error.message);
    this.code = error.code;
  }
}
