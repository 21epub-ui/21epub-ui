import type { CommentData, CommentListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

type RequestBody = Pick<CommentData, 'archived'>

const updateComment = (id: string, data: RequestBody) => {
  return api.patch<ResponseBody<CommentListData>>(`comments/${id}`, data)
}

export default updateComment
