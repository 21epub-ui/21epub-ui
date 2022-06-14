const uploadFile = (
  url: string,
  params: Record<string, string | number | Blob | undefined>,
  callback: (xhr: XMLHttpRequest) => void
) => {
  const formData = new FormData()
  const xhr = new XMLHttpRequest()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return

    formData.append(key, value instanceof Blob ? value : value.toString())
  })

  xhr.open('POST', url)
  callback(xhr)
  xhr.send(formData)

  return xhr
}

export default uploadFile
