import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genReadMe from './generators/genReadMe.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTsConfig from './generators/genTsConfig.mjs'
import genTypes from './generators/genTypes.mjs'
import getFirstArgv from './helpers/getFirstArgv.mjs'

const packageName = getFirstArgv()

if (packageName !== undefined) {
  await genPackage()
  await genTsConfig()
  await genTemplate()
  await genStories()
  await genTypes()
  await genIndex()
  await genReadMe()
}
