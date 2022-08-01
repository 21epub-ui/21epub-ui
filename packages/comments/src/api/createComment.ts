import type { CommentData, CommentListData } from '../index.types'
import type { ResponseData } from './request'
import request from './request'

type RequestData = Pick<CommentData, 'slug' | 'target' | 'content'>

const createComment = (data: RequestData) => {
  return request
    .post('comments/', { json: data })
    .json<ResponseData<CommentListData>>()
}

export default createComment
