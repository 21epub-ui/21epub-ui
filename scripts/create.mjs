import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import { resolve } from 'path'
import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genReadMe from './generators/genReadMe.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTypes from './generators/genTypes.mjs'
import getScope from './utils/getScope.mjs'
import kebabToPascal from './utils/kebabToPascal.mjs'

const argv = process.argv.slice(2)
const [name] = argv

if (name !== undefined) {
  const dirPath = resolve('packages', name)

  const { name: rootPackageName } = await fs.readJSON('package.json')
  const packageScope = getScope(rootPackageName)
  const packageName = `${packageScope}/${name}`
  const componentName = kebabToPascal(name)

  await genPackage(dirPath, { packageName })
  await genTemplate(dirPath, { componentName })
  await genStories(dirPath, { componentName })
  await genTypes(dirPath, { componentName })
  await genIndex(dirPath, { componentName })
  await genReadMe(dirPath, { packageName, componentName })

  await fs.symlink(
    '../../shared/tsconfig.json',
    resolve(dirPath, 'tsconfig.json')
  )

  await execute('yarn')
}
