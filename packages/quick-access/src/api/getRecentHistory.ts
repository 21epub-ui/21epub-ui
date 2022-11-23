import type { LinkList } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

const getRecentHistory = async (type: string) => {
  const res = await api
    .get(`${type}/works/recent`)
    .json<ResponseBody<LinkList>>()

  return res.data.results
}

export default getRecentHistory
