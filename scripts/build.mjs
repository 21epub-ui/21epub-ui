import { execute } from '@yarnpkg/shell'
import { build, context } from 'esbuild'
import { readJson } from 'fs-extra/esm'
import { argv } from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import getBuildOptions from './helpers/getBuildOptions.mjs'
import getDependencies from './helpers/getDependencies.mjs'

const manifest = await readJson('package.json')

const { watch, standalone } = yargs(hideBin(argv)).alias('w', 'watch').argv

if (!standalone) {
  const dependencies = await getDependencies(manifest.name)

  console.log(`Running build in ${dependencies.length + 1} packages\n`)

  for await (const dependency of dependencies.reverse()) {
    await execute(
      `yarn workspace ${dependency} run build --exclude-dependencies`
    )
  }
}

console.log(`Building ${manifest.name}...`)

if (!watch) {
  await build(await getBuildOptions('cjs'))
  await build(await getBuildOptions('esm'))
} else {
  const cjsContext = await context(await getBuildOptions('cjs', true))
  const esmContext = await context(await getBuildOptions('esm', true))

  await esmContext.watch()
  await cjsContext.watch()
}
