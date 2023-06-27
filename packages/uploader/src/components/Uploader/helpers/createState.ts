const createState = (id: string | number, file: File) => {
  return {
    file,
    uid: `${Date.now()}_${id}`,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  }
}

export default createState
