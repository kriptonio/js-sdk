interface ErrorInfo {
  rpcCode?: number;
  message?: string;
}

export class KriptonioError extends Error {
  public rpcCode: number | undefined;

  constructor(error: ErrorInfo) {
    super(error.message);
    this.rpcCode = error.rpcCode;
  }
}
