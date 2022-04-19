export const uploadUrl = '/v3/api/material/personal'

const uploadFile = (
  params: Record<string, string | number | Blob | undefined>,
  callback: (xhr: XMLHttpRequest) => void
) => {
  const formData = new FormData()
  const xhr = new XMLHttpRequest()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return

    formData.append(key, value instanceof Blob ? value : value.toString())
  })

  xhr.open('POST', uploadUrl)
  callback(xhr)
  xhr.send(formData)

  return xhr
}

export default uploadFile
