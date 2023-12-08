import axios, { AxiosError, Method } from 'axios';
import { Configuration } from '../Configuration';
import { ApiErrorModel } from '../model/ApiErrorModel';
import { ApiErrorResponse } from '../types/apiErrorResponse';

export type IHttpOkResponse<R> = {
  ok: true;
  data: R;
  httpStatusCode: number;
};

export type IHttpNotOkResponse = {
  ok: false;
  httpStatusCode: number;
  error: ApiErrorModel;
};

export type IHttpResponse<R> = IHttpOkResponse<R> | IHttpNotOkResponse;

export interface AuthenticationData {
  accessToken?: string;
  sessionToken?: string;
}

export interface AjaxOptions {
  host?: string;
  method?: Method;
}

export interface IAjaxCallOptions {
  baseURL?: string;
  data?: unknown;
  timeout?: number;
}

export class ApiClient {
  #authentication: AuthenticationData | null = null;

  constructor(authentication: AuthenticationData) {
    this.setAuthentication(authentication);
  }

  private readonly call = async <T = unknown>(
    method: Method,
    url: string,
    options: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    try {
      const requestHeaders: { [key: string]: string } = {};

      if (this.authenticationHeader) {
        requestHeaders[this.authenticationHeader.key] =
          this.authenticationHeader.value;
      }

      const response = await axios.request<T>({
        method,
        url,
        data: options.data,
        headers: requestHeaders,
        baseURL: options.baseURL ?? Configuration.apiUrl,
        timeout: options.timeout ?? 100_000,
      });

      return {
        ok: true,
        data: response.data,
        httpStatusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (axiosError.response?.status) {
        return {
          ok: false,
          httpStatusCode: axiosError.response.status,
          error: ApiErrorModel.from(axiosError),
        };
      }

      throw error;
    }
  };

  public get accessToken(): string | null {
    return this.#authentication?.accessToken ?? null;
  }

  public get authenticationHeader() {
    if (!this.#authentication) {
      return null;
    }

    if (this.#authentication.accessToken) {
      return { key: 'X-Access-Token', value: this.#authentication.accessToken };
    }

    if (this.#authentication.sessionToken) {
      return {
        key: 'X-Session-Token',
        value: this.#authentication.sessionToken,
      };
    }

    return null;
  }

  public setAuthentication = (authentication: AuthenticationData) => {
    this.#authentication = authentication;
  };

  public get = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('GET', url, opts);
  };

  public post = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('POST', url, opts);
  };

  public put = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('PUT', url, opts);
  };

  public delete = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('DELETE', url, opts);
  };
}
