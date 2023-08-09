import { resolve } from 'node:path'
import getPackagePath from '../helpers/getPackagePath.mjs'
import outputJson from '../helpers/outputJson.mjs'

const genTsConfig = async (packageName) => {
  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'tsconfig.json')

  const template = {
    extends: '../../tsconfig.json',
    include: ['./src', './stories', '../../typings'],
  }

  await outputJson(filePath, template)
}

export default genTsConfig
