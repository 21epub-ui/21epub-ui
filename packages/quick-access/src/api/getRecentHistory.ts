import type { LinkList } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

const getRecentHistory = async (type: string) => {
  const res = await api.get<ResponseBody<LinkList>>(`${type}/works/recent`)

  return res.data.results
}

export default getRecentHistory
