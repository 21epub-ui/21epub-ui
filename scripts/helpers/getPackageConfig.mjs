import { readJson } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getPackagePath from './getPackagePath.mjs'

const getPackageConfig = (name) => {
  return readJson(resolve(getPackagePath(name), 'package.json'))
}

export default getPackageConfig
