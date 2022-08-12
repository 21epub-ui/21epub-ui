import type { ReplyData, ReplyListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

type RequestBody = Pick<ReplyData, 'slug' | 'target' | 'content' | 'ref'>

const createReply = (id: string, data: RequestBody) => {
  return api.post<ResponseBody<ReplyListData>>(`comments/${id}/`, data)
}

export default createReply
