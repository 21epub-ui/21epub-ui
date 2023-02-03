import api from './api'

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api
    .url('comments/assets/')
    .formData({ file })
    .post()
    .json<{ url: string }>()

  return res.url
}

export default uploadFile
