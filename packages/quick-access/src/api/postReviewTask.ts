import type { ResponseBody } from './api'
import api from './api'

const postReviewTask = async (id: string) => {
  const res = await api
    .post('review/tasks/', { body: { uuid: id } })
    .json<ResponseBody<{ id: string }[]>>()

  return res.data.results[0]
}

export default postReviewTask
