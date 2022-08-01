import ky from 'ky'

export interface Response<T> {
  data: {
    results: T
  }
}

const request = ky.extend({
  prefixUrl: '/v3/api/',
})

export default request
