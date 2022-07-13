import { extend } from 'umi-request'

export interface ResponseData<T> {
  content: T
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

const request = extend({
  prefix: '/v3/api/',
})

export default request
