const checkFileSize = (size: number) => size / 1024 ** 2 <= 200

export default checkFileSize
