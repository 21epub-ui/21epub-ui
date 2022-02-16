import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import path from 'path'
import simpleGit from 'simple-git'

const git = simpleGit()

const tags = await git.tags()
const tagName = tags.latest
const packageName = tagName?.match(/^@.+\/.+(?=@(?:\d+\.){2}\d+)/)[0]

if (packageName !== undefined) {
  const dirPath = path.resolve('packages', packageName.split('/')[1])
  const filePath = path.resolve(dirPath, 'package.json')

  const packageConfig = await fs.readJSON(filePath)

  await execute(`yarn workspace ${packageName} run build`)

  await fs.outputJson(
    filePath,
    { ...packageConfig, scripts: undefined, devDependencies: undefined },
    { spaces: 2 }
  )

  await execute(`yarn workspace ${packageName} npm publish`)

  await fs.outputJson(filePath, packageConfig, { spaces: 2 })
}
