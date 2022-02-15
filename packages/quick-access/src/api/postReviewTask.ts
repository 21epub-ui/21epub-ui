import request from 'umi-request'

const postReviewTask = async (id: string) => {
  const res = await request.post('/v3/api/review/tasks/', {
    data: { uuid: id },
  })

  return res.data.results[0]
}

export default postReviewTask
