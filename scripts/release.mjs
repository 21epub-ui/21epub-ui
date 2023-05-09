import { execute } from '@yarnpkg/shell'
import { readJson } from 'fs-extra/esm'
import { copyFile, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import simpleGit from 'simple-git'
import pick from '../scripts/utils/pick.mjs'
import getPackagePath from './helpers/getPackagePath.mjs'
import outputJson from './helpers/outputJson.mjs'

const git = simpleGit()

const tagName = await git.raw(['describe', '--tags'])
const scopedPackageName = tagName?.match(/^@.+\/.+(?=@(?:\d+\.){2}\d+)/)?.at(0)

if (scopedPackageName !== undefined) {
  const dirPath = getPackagePath(scopedPackageName.split('/').at(1))
  const configPath = resolve(dirPath, 'package.json')
  const licensePath = resolve(dirPath, 'LICENSE')

  const manifest = await readJson(configPath)

  await execute('yarn')
  await execute(`yarn workspace ${scopedPackageName} run build`)

  await copyFile(resolve('LICENSE'), licensePath)
  await outputJson(configPath, {
    ...pick(manifest, [
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

  await execute(`yarn workspace ${scopedPackageName} npm publish`)

  await unlink(licensePath)
  await outputJson(configPath, manifest)
}
