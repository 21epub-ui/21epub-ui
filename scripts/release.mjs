import { execute } from '@yarnpkg/shell'
import simpleGit from 'simple-git'

const git = simpleGit()

const tags = await git.tags()
const tagName = tags.latest
const packageName = tagName?.match(/^@.+\/.+(?=@(?:\d+\.){2}\d+)/)[0]

if (packageName !== undefined) {
  await execute(`yarn workspace ${packageName} run build`)
  await execute(`yarn workspace ${packageName} npm publish`)
}
