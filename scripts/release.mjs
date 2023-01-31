import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import { resolve } from 'node:path'
import simpleGit from 'simple-git'
import pick from '../scripts/utils/pick.mjs'
import getPackagePath from './helpers/getPackagePath.mjs'
import outputJson from './helpers/outputJson.mjs'

const git = simpleGit()

const tagName = await git.raw(['describe', '--tags'])
const packageName = tagName?.match(/^@.+\/.+(?=@(?:\d+\.){2}\d+)/)?.at(0)

if (packageName !== undefined) {
  const dirPath = getPackagePath(packageName.split('/').at(1))
  const configPath = resolve(dirPath, 'package.json')
  const licensePath = resolve(dirPath, 'LICENSE')

  const packageConfig = await fs.readJson(configPath)

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
