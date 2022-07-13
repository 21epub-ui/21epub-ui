import request from './request'

const postReviewTask = async (id: string) => {
  const res = await request.post('review/tasks/', {
    data: { uuid: id },
  })

  return res.data.results[0]
}

export default postReviewTask
