import api from './api'

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api.post<{ url: string }>('comments/assets/', formData)

  return res.url
}

export default uploadFile
