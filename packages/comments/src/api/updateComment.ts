import type { CommentData, CommentListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

type RequestBody = Pick<CommentData, 'archived'>

const updateComment = (id: string, body: RequestBody) => {
  return api
    .patch(`comments/${id}`, { body })
    .json<ResponseBody<CommentListData>>()
}

export default updateComment
