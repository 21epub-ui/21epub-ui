import { outputJSON } from 'fs-extra/esm'

const outputJson = (file, object, options) => {
  return outputJSON(file, object, { spaces: 2, ...options })
}

export default outputJson
