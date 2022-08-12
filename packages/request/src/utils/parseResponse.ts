import type { RequestOptions } from '../index.types'

const parseResponse = (response: Response, options: RequestOptions) => {
  const type = options.responseType || 'json'

  if (options.extractResponse === false) return response

  switch (type) {
    case 'json':
      return response.json()
    case 'text':
      return response.text()
    case 'blob':
      return response.blob()
    case 'arraybuffer':
      return response.arrayBuffer()
    default:
      throw new TypeError(
        "The `responseType` option must be 'json', 'text', 'blob' or 'arraybuffer'"
      )
  }
}

export default parseResponse
