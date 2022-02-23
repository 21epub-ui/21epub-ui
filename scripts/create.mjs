import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import { resolve } from 'path'
import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTsConfig from './generators/genTsConfig.mjs'
import genTypesIndex from './generators/genTypesIndex.mjs'
import genDeclaration from './generators/genDeclaration.mjs'
import getScope from './utils/getScope.mjs'
import kebabToPascal from './utils/kebabToPascal.mjs'

const argv = process.argv.slice(2)
const [packageName] = argv

if (packageName !== undefined) {
  const dirPath = resolve('packages', packageName)

  const { name: rootPackageName } = await fs.readJSON('package.json')
  const packageScope = getScope(rootPackageName)
  const ComponentName = kebabToPascal(packageName)

  await genPackage(dirPath, { name: `${packageScope}/${packageName}` })
  await genTsConfig(dirPath)
  await genDeclaration(dirPath)
  await genTemplate(dirPath, { name: ComponentName })
  await genStories(dirPath, { name: ComponentName })
  await genTypesIndex(dirPath, { name: ComponentName })
  await genIndex(dirPath, { name: ComponentName })

  await execute('yarn')
}
