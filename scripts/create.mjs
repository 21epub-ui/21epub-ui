import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import path from 'path'
import getScope from './utils/getScope.mjs'
import generateConfig from './utils/generateConfig.mjs'

const argv = process.argv.slice(2)
const [packageName] = argv

if (packageName !== undefined) {
  const outputPath = path.resolve('packages', packageName)

  const { name: rootPackageName } = await fs.readJSON('package.json')
  const packageScope = getScope(rootPackageName)

  await generateConfig(outputPath, 'package.json', {
    name: `${packageScope}/${packageName}`,
  })
  await generateConfig(outputPath, 'tsconfig.json')

  await execute('yarn')
}
