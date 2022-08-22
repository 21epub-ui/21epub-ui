import type { stop } from './modules/ky/source/core/constants'
import type { Input, Options } from './modules/ky/source/types/options'
import type { KyResponse } from './modules/ky/source/types/response'

export type ResponseType = 'json' | 'text' | 'blob' | 'arraybuffer'

export interface RequestOptions<
  T extends ResponseType = ResponseType,
  U extends boolean = boolean
> extends Omit<Options, 'body' | 'json'> {
  body?: unknown
  /**
   * @default 'json'
   */
  responseType?: T
  /**
   * @default true
   */
  extractResponse?: U
}

type ResponseContent<V, T extends ResponseType> = T extends 'json'
  ? V
  : T extends 'text'
  ? string
  : T extends 'blob'
  ? Blob
  : T extends 'arraybuffer'
  ? ArrayBuffer
  : never

type ResponsePromise<
  V,
  T extends ResponseType = 'json',
  U extends boolean = true
> = Promise<U extends false ? KyResponse : ResponseContent<V, T>>

type Request = <V, T extends ResponseType = 'json', U extends boolean = true>(
  url: Input,
  options?: RequestOptions<T, U>
) => ResponsePromise<V, T, U>

type CreateInstance = <
  T extends ResponseType = 'json',
  U extends boolean = true
>(
  defaultOptions?: RequestOptions<T, U>
) => RequestInstance

export interface RequestInstance extends Request {
  get: Request
  delete: Request
  head: Request
  options: Request
  post: Request
  put: Request
  patch: Request
  create: CreateInstance
  extend: CreateInstance
  readonly stop: typeof stop
}

export type {
  AfterResponseHook,
  BeforeErrorHook,
  BeforeRequestHook,
  BeforeRetryHook,
  BeforeRetryState,
  Hooks,
} from './modules/ky/source/types/hooks'
export type {
  DownloadProgress,
  RetryOptions,
  SearchParamsOption,
} from './modules/ky/source/types/options'
