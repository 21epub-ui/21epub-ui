import fs from 'fs-extra'

const outputJson = (file, object, options) => {
  return fs.outputJson(file, object, { spaces: 2, ...options })
}

export default outputJson
