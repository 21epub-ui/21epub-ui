import type { CommentData, CommentListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

type RequestBody = Pick<CommentData, 'slug' | 'target' | 'content'>

const createComment = (body: RequestBody) => {
  return api.post('comments/', { body }).json<ResponseBody<CommentListData>>()
}

export default createComment
