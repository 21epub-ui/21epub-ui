import type { CommentData } from '../index.types'
import type { Response } from './request'
import request from './request'

type RequestData = Pick<CommentData, 'slug' | 'target' | 'content'>

const createComment = (data: RequestData) => {
  return request.post<Response<CommentData>>('comments/', {
    data,
  })
}

export default createComment
