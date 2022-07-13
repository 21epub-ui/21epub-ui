import request from './request'

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await request.post<{ url: string }>('comments/assets/', {
    data: formData,
  })

  return res.url
}

export default uploadFile
