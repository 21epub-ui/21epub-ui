import type { LinkList } from '../index.types'
import request from 'umi-request'

interface ResponseData {
  data: {
    results: LinkList
  }
}

const fetchRecentHistory = async (type: string) => {
  const res = await request.get<ResponseData>(`/v3/api/${type}/works/recent`)

  return res.data.results
}

export default fetchRecentHistory
