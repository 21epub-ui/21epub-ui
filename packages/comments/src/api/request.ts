import ky from 'ky'

export interface ResponseData<T> {
  content: T
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

const request = ky.extend({
  prefixUrl: '/v3/api/',
})

export default request
