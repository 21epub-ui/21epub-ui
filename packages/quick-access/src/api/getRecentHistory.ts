import type { LinkList } from '../index.types'
import type { Response } from './request'
import request from './request'

const getRecentHistory = async (type: string) => {
  const res = await request
    .get(`${type}/works/recent`)
    .json<Response<LinkList>>()

  return res.data.results
}

export default getRecentHistory
