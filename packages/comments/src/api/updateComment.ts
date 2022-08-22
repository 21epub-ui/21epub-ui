import type { CommentData, CommentListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

type RequestBody = Pick<CommentData, 'archived'>

const updateComment = (id: string, body: RequestBody) => {
  return api.patch<ResponseBody<CommentListData>>(`comments/${id}`, { body })
}

export default updateComment
