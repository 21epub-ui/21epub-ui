import type { ReplyData } from '../index.types'
import type { Response } from './request'
import request from './request'

type RequestData = Pick<ReplyData, 'slug' | 'target' | 'content' | 'ref'>

const createReply = (id: string, data: RequestData) => {
  return request.post<Response<ReplyData>>(`comments/${id}/`, {
    data,
  })
}

export default createReply
