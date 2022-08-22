import type { CommentListData } from '../index.types'
import type { ResponseBody } from './api'
import api from './api'

export type GetCommentsParams = {
  slug: string
  target: string
  archived?: boolean
  after?: string
  before?: string
}

const getComments = (params: GetCommentsParams) => {
  return api.get<ResponseBody<CommentListData>>('comments/', { params })
}

export default getComments
