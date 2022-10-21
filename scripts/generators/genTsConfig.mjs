import { resolve } from 'path'
import getName from '../utils/getName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import outputJson from '../utils/outputJson.mjs'

const genTsConfig = async () => {
  const name = getName()

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'package.json')

  const template = {
    extends: '../../tsconfig.json',
    compilerOptions: {
      jsxImportSource: '@emotion/react',
    },
    include: ['src/**/*', 'stories/**/*', '../../typings/*'],
  }

  await outputJson(filePath, template)
}

export default genTsConfig
