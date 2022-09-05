import fs from 'fs-extra'
import { resolve } from 'path'
import getPackagePath from '../utils/getPackagePath.mjs'

const getPackageConfig = (name) => {
  return fs.readJson(resolve(getPackagePath(name), 'package.json'))
}

export default getPackageConfig
