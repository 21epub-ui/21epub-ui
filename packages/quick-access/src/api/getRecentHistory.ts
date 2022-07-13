import type { LinkList } from '../index.types'
import type { ResponseData } from './request'
import request from './request'

const getRecentHistory = async (type: string) => {
  const res = await request.get<ResponseData<LinkList>>(`${type}/works/recent`)

  return res.data.results
}

export default getRecentHistory
