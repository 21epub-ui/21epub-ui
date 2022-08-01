import type { Response } from './request'
import request from './request'

const postReviewTask = async (id: string) => {
  const res = await request
    .post('review/tasks/', { json: { uuid: id } })
    .json<Response<{ id: string }[]>>()

  return res.data.results[0]
}

export default postReviewTask
