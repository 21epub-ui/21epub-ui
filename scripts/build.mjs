import { execute } from '@yarnpkg/shell'
import { build, context } from 'esbuild'
import { readJson } from 'fs-extra/esm'
import { parseArgs } from 'node:util'
import getBuildOptions from './helpers/getBuildOptions.mjs'
import getPackages from './helpers/getPackages.mjs'
import printer from './utils/printer.mjs'

try {
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
    const packages = await getPackages(manifest.name)

    console.log(`Running build in ${packages.length} packages\n`)

    for (const packageName of packages.slice(0, -1)) {
      await execute(`yarn workspace ${packageName} run build --isolated`)
    }
  }

  console.log(`Building ${manifest.name}...`)

  if (watch) {
    const esmContext = await context(await getBuildOptions('esm'))
    const cjsContext = await context(await getBuildOptions('cjs'))

    await esmContext.watch()
    await cjsContext.watch()
  } else {
    await build(await getBuildOptions('esm'))
    await build(await getBuildOptions('cjs'))
  }
} catch (error) {
  console.error(printer.red(error))
}
