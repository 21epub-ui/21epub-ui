import wretch from 'wretch'
import FormDataAddon from 'wretch/addons/formData'
import QueryStringAddon from 'wretch/addons/queryString'

export interface ResponseBody<T> {
  content: T
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

const api = wretch('/v3/api/').addon(FormDataAddon).addon(QueryStringAddon)

export default api
