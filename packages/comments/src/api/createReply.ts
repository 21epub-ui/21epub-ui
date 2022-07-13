import type { ReplyData, ReplyListData } from '../index.types'
import type { ResponseData } from './request'
import request from './request'

type RequestData = Pick<ReplyData, 'slug' | 'target' | 'content' | 'ref'>

const createReply = (id: string, data: RequestData) => {
  return request.post<ResponseData<ReplyListData>>(`comments/${id}/`, {
    data,
  })
}

export default createReply
