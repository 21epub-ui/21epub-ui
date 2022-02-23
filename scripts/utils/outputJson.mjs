import fs from 'fs-extra'

const outputJson = (file, object, options, callback) => {
  return fs.outputJson(file, object, { spaces: 2, ...options }, callback)
}

export default outputJson
