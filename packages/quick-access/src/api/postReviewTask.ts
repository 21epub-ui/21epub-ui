import type { ResponseBody } from './api'
import api from './api'

const postReviewTask = async (id: string) => {
  const res = await api
    .post({ uuid: id }, 'review/tasks/')
    .json<ResponseBody<{ id: string }[]>>()

  return res.data.results[0]
}

export default postReviewTask
