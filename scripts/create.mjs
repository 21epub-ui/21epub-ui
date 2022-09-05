import fs from 'fs-extra'
import { resolve } from 'path'
import genIndex from './generators/genIndex.mjs'
import genPackage from './generators/genPackage.mjs'
import genReadMe from './generators/genReadMe.mjs'
import genStories from './generators/genStories.mjs'
import genTemplate from './generators/genTemplate.mjs'
import genTypes from './generators/genTypes.mjs'
import getPackagePath from './utils/getPackagePath.mjs'

const argv = process.argv.slice(2)
const [name] = argv

if (name !== undefined) {
  await genPackage()
  await genTemplate()
  await genStories()
  await genTypes()
  await genIndex()
  await genReadMe()

  await fs.symlink(
    resolve(getPackagePath('root'), 'shared', 'tsconfig.json'),
    resolve(getPackagePath(name), 'tsconfig.json')
  )
}
