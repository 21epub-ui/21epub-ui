import { request } from '@21epub-ui/request'

export interface ResponseBody<T> {
  content: T
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

const api = request.extend({
  prefixUrl: '/v3/api/',
})

export default api
