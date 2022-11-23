import api from './api'

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api
    .post('comments/assets/', { body: formData })
    .json<{ url: string }>()

  return res.url
}

export default uploadFile
