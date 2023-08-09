import { execute } from '@yarnpkg/shell'
import { build, context } from 'esbuild'
import { readJson } from 'fs-extra/esm'
import { parseArgs } from 'node:util'
import getBuildOptions from './helpers/getBuildOptions.mjs'
import getDependencies from './helpers/getDependencies.mjs'

const manifest = await readJson('package.json')

const { watch, isolated } = parseArgs({
  options: {
    watch: {
      type: 'boolean',
      short: 'w',
    },
    isolated: {
      type: 'boolean',
    },
  },
}).values

if (!isolated) {
  const dependencies = await getDependencies(manifest.name)

  console.log(`Running build in ${dependencies.length + 1} packages\n`)

  for (const dependency of dependencies.reverse()) {
    await execute(`yarn workspace ${dependency} run build --isolated`)
  }
}

console.log(`Building ${manifest.name}...`)

if (!watch) {
  await build(await getBuildOptions('cjs'))
  await build(await getBuildOptions('esm'))
} else {
  const cjsContext = await context(await getBuildOptions('cjs'))
  const esmContext = await context(await getBuildOptions('esm'))

  await esmContext.watch()
  await cjsContext.watch()
}
