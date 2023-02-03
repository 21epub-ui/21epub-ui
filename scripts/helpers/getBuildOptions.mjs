import browserslist from 'browserslist'
import { readJson } from 'fs-extra/esm'
import { dirname } from 'node:path'
import { cwd, env } from 'node:process'
import eslintPlugin from '../plugins/eslintPlugin.mjs'
import swcPlugin from '../plugins/swcPlugin.mjs'
import typescriptPlugin from '../plugins/typescriptPlugin.mjs'
import filterDependencies from './filterDependencies.mjs'
import getPackageConfig from './getPackageConfig.mjs'
import getPackageName from './getPackageName.mjs'

const assetExtNames = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp']

const getBuildOptions = async (format, incremental) => {
  const packageConfig = await readJson('package.json')

  const dependencies = Object.keys({
    ...packageConfig.dependencies,
    ...packageConfig.peerDependencies,
  })

  const buildOptions = {
    format,
    bundle: true,
    sourcemap: true,
    logLevel: 'info',
    entryPoints: [packageConfig.source],
    external: dependencies,
    loader: Object.fromEntries(
      assetExtNames.map((extName) => {
        return [extName, 'dataurl']
      })
    ),
  }

  const packageMap = await filterDependencies(packageConfig).reduce(
    async (previousPackageMap, currentScopedPackageName) => {
      const packageMap = await previousPackageMap

      const packageName = getPackageName(currentScopedPackageName)
      const packageConfig = await getPackageConfig(packageName)
      const packagePath = `../${packageName}/${dirname(packageConfig.typings)}`

      return packageMap.set(currentScopedPackageName, [packagePath])
    },
    Promise.resolve(new Map())
  )

  const typescriptOptions = {
    compilerOptions: {
      incremental,
      noEmit: false,
      paths: Object.fromEntries(packageMap),
      declarationDir: dirname(packageConfig.typings),
    },
  }

  const targets = browserslist.loadConfig({ path: cwd(), env: env.NODE_ENV })

  const swcOptions = {
    rootMode: 'upward',
    jsc: {
      transform: {
        react: {
          importSource: dependencies.includes('@emotion/react')
            ? '@emotion/react'
            : 'react',
        },
      },
    },
    env: { targets },
  }

  if (format === 'esm') {
    return {
      ...buildOptions,
      outfile: packageConfig.module,
      plugins: [
        eslintPlugin(),
        typescriptPlugin({ typescriptOptions }),
        swcPlugin({ swcOptions }),
      ],
    }
  }

  return {
    ...buildOptions,
    outfile: packageConfig.main,
    plugins: [swcPlugin(swcOptions)],
  }
}

export default getBuildOptions
