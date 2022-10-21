import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import simpleGit from 'simple-git'
import printer from './utils/printer.mjs'

const git = simpleGit()

const { isClean, current } = await git.status()

if (!isClean()) {
  console.error(printer.red('Git working directory not clean.'))
  process.exitCode = 1
} else {
  const argv = process.argv.slice(2)
  const [strategy] = argv

  await execute(`yarn version ${strategy}`)
  await execute('yarn stage')

  const { version } = await fs.readJson('package.json')

  const tagName = `${process.env.npm_package_name}@${version}`
  const message = `chore(release): ${tagName}`
  const command = `git push --follow-tags origin ${current}`

  await git.commit(message)
  await git.addAnnotatedTag(tagName, message)

  console.log(`\ntagging release ${printer.bold(tagName)}`)
  console.log(`Run \`${printer.bold(command)}\` to publish`)
}
