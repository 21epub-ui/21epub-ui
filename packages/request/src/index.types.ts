import type { stop } from './modules/ky/source/core/constants'
import type { Input, Options } from './modules/ky/source/types/options'
import type { ResponsePromise } from './modules/ky/source/types/ResponsePromise'

export interface RequestOptions extends Omit<Options, 'body' | 'json'> {
  body?: unknown
}

type CreateInstance = (defaultOptions?: RequestOptions) => RequestInstance

export type Request = (url: Input, options?: RequestOptions) => ResponsePromise

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
  NormalizedOptions,
  RetryOptions,
  SearchParamsOption,
  DownloadProgress,
} from './modules/ky/source/types/options'

export type {
  AfterResponseHook,
  BeforeErrorHook,
  BeforeRequestHook,
  BeforeRetryHook,
  BeforeRetryState,
  Hooks,
} from './modules/ky/source/types/hooks'

export type { RequestResponse } from './modules/ky/source/types/response.js'

export type { ResponsePromise }
