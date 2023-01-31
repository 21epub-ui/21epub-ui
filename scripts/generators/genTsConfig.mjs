import { resolve } from 'node:path'
import getName from '../helpers/getName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import outputJson from '../helpers/outputJson.mjs'

const genTsConfig = async () => {
  const name = getName()

  const dirPath = getPackagePath(name)
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
