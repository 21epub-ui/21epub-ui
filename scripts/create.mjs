import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import path from 'path'
import getScope from './utils/getScope.mjs'
import generateConfig from './utils/generateConfig.mjs'

const argv = process.argv.slice(2)
const [packageName] = argv

if (packageName !== undefined) {
  const dirPath = path.resolve('packages', packageName)

  const { name: rootPackageName } = await fs.readJSON('package.json')
  const packageScope = getScope(rootPackageName)

  await generateConfig(dirPath, 'package.json', {
    name: `${packageScope}/${packageName}`,
  })
  await generateConfig(dirPath, 'tsconfig.json')

  await execute('yarn')
}
