import type { CommentData, CommentListData } from '../index.types'
import type { ResponseData } from './request'
import request from './request'

type RequestData = Pick<CommentData, 'archived'>

const updateComment = (id: string, data: RequestData) => {
  return request
    .patch(`comments/${id}`, { json: data })
    .json<ResponseData<CommentListData>>()
}

export default updateComment
