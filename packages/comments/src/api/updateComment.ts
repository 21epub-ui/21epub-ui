import type { CommentData } from '../index.types'
import type { Response } from './request'
import request from './request'

type RequestData = Pick<CommentData, 'archived'>

const updateComment = (id: string, data: RequestData) => {
  return request.patch<Response<CommentData>>(`comments/${id}`, { data })
}

export default updateComment
