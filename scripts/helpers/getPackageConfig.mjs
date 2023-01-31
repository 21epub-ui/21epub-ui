import fs from 'fs-extra'
import { resolve } from 'node:path'
import getPackagePath from './getPackagePath.mjs'

const getPackageConfig = (name) => {
  return fs.readJson(resolve(getPackagePath(name), 'package.json'))
}

export default getPackageConfig
