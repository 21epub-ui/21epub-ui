import { readJson } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getPackageName from './getPackageName.mjs'
import getPackagePath from './getPackagePath.mjs'

const getManifest = (name) => {
  const packageName = name.at(0) === '@' ? getPackageName(name) : name

  return readJson(resolve(getPackagePath(packageName), 'package.json'))
}

export default getManifest
