import { request } from '@21epub-ui/request'

export interface ResponseBody<T> {
  data: {
    results: T
  }
}

const api = request.extend({
  prefixUrl: '/v3/api/',
})

export default api
