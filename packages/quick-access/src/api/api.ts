import wretch from 'wretch'

export interface ResponseBody<T> {
  data: {
    results: T
  }
}

const api = wretch('/v3/api/')

export default api
