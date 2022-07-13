import type { CommentData } from '../index.types'
import type { Response } from './request'
import request from './request'

export interface GetCommentsParams {
  slug: string
  target: string
  archived?: boolean
  after?: string
  before?: string
}

const getComments = (params: GetCommentsParams) => {
  const archived = Boolean(params.archived).toString()
  const searchParams = new URLSearchParams({ ...params, archived })

  return request.get<Response<CommentData>>(
    `comments/?${searchParams.toString()}`
  )
}

export default getComments
