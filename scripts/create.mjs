import { parseArgs } from 'node:util'
import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genReadMe from './generators/genReadMe.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTsConfig from './generators/genTsConfig.mjs'
import genTypes from './generators/genTypes.mjs'

const packageName = parseArgs({ allowPositionals: true }).positionals.at(0)

if (packageName !== undefined) {
  await genPackage(packageName)
  await genTsConfig(packageName)
  await genTemplate(packageName)
  await genStories(packageName)
  await genTypes(packageName)
  await genIndex(packageName)
  await genReadMe(packageName)
}
