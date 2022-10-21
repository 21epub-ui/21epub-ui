import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genReadMe from './generators/genReadMe.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTsConfig from './generators/genTsConfig.mjs'
import genTypes from './generators/genTypes.mjs'

const argv = process.argv.slice(2)
const [name] = argv

if (name !== undefined) {
  await genPackage()
  await genTsConfig()
  await genTemplate()
  await genStories()
  await genTypes()
  await genIndex()
  await genReadMe()
}
