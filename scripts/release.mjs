import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import { resolve } from 'path'
import simpleGit from 'simple-git'
import pick from '../scripts/utils/pick.mjs'
import outputJson from './utils/outputJson.mjs'

const git = simpleGit()

const tags = await git.tags()
const tagName = tags.latest
const packageName = tagName?.match(/^@.+\/.+(?=@(?:\d+\.){2}\d+)/)[0]

if (packageName !== undefined) {
  const dirPath = resolve('packages', packageName.split('/')[1])
  const configPath = resolve(dirPath, 'package.json')
  const licensePath = resolve(dirPath, 'LICENSE')

  const packageConfig = await fs.readJSON(configPath)

  await execute(`yarn workspace ${packageName} run build`)

  await fs.copyFile(resolve('LICENSE'), licensePath)
  await outputJson(configPath, {
    ...pick(packageConfig, [
      'name',
      'version',
      'main',
      'module',
      'typings',
      'sideEffects',
      'files',
      'peerDependencies',
      'dependencies',
    ]),
    license: 'MIT',
  })

  await execute(`yarn workspace ${packageName} npm publish`)

  await fs.unlink(licensePath)
  await outputJson(configPath, packageConfig)
}
