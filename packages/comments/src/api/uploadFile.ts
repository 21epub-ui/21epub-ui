import request from './request'

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await request
    .post('comments/assets/', { body: formData })
    .json<{ url: string }>()

  return res.url
}

export default uploadFile
