const getRandomId = (length: number) => {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((byte) => {
      byte = byte & 63

      if (byte < 36) {
        // `0-9a-z`
        return byte.toString(36)
      }

      if (byte < 62) {
        // `A-Z`
        return (byte - 26).toString(36).toUpperCase()
      }

      if (byte === 62) {
        return '_'
      }

      return '-'
    })
    .join('')
}

export default getRandomId
