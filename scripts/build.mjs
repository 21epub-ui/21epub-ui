import { execute } from '@yarnpkg/shell'
import { build, context } from 'esbuild'
import fs from 'fs-extra'
import { resolve } from 'node:path'
import { argv } from 'node:process'
import getBuildOptions from './helpers/getBuildOptions.mjs'

const packageConfig = await fs.readJson(resolve('package.json'))

const dependencies = Object.entries(packageConfig.dependencies ?? {}).filter(
  (dependency) => /^workspace/.test(dependency[1])
)

await Promise.all(
  dependencies.map((dependency) => {
    return execute(`yarn workspace ${dependency[0]} run build`)
  })
)

const incremental = argv.slice(2).includes('--watch')

if (incremental) {
  const esmContext = await context(await getBuildOptions('esm', true))
  const cjsContext = await context(await getBuildOptions('cjs', true))

  await esmContext.watch()
  await cjsContext.watch()
} else {
  await build(await getBuildOptions('esm'))
  await build(await getBuildOptions('cjs'))
}
