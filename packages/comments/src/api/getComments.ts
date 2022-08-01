import type { CommentListData } from '../index.types'
import type { ResponseData } from './request'
import request from './request'

export interface GetCommentsParams {
  slug: string
  target: string
  archived?: boolean
  after?: string
  before?: string
}

const getComments = (params: GetCommentsParams) => {
  return request
    .get('comments/', { searchParams: { ...params } })
    .json<ResponseData<CommentListData>>()
}

export default getComments
