import { extend } from 'umi-request'

export interface ResponseData<T> {
  data: {
    results: T
  }
}

const request = extend({
  prefix: '/v3/api/',
})

export default request
