import type { ResponseBody } from './api'
import api from './api'

const postReviewTask = async (id: string) => {
  const res = await api.post<ResponseBody<{ id: string }[]>>('review/tasks/', {
    body: { uuid: id },
  })

  return res.data.results[0]
}

export default postReviewTask
