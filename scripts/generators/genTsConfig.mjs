import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import outputJson from '../helpers/outputJson.mjs'

const genTsConfig = async () => {
  const packageName = getFirstArgv()

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'tsconfig.json')

  const template = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      jsxImportSource: '@emotion/react',
    },
    include: ['./src', './stories', '../../typings'],
  }

  await outputJson(filePath, template)
}

export default genTsConfig
