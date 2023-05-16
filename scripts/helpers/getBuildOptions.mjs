import browserslist from 'browserslist'
import { readJson } from 'fs-extra/esm'
import { dirname } from 'node:path'
import { cwd, env } from 'node:process'
import eslintPlugin from '../plugins/eslintPlugin.mjs'
import swcPlugin from '../plugins/swcPlugin.mjs'
import typescriptPlugin from '../plugins/typescriptPlugin.mjs'
import filterDependencies from './filterDependencies.mjs'
import getManifest from './getManifest.mjs'
import getPackageName from './getPackageName.mjs'

const assetExtNames = [
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
]

const getBuildOptions = async (format) => {
  const manifest = await readJson('package.json')

  const dependencies = Object.keys({
    ...manifest.dependencies,
    ...manifest.peerDependencies,
  })

  const buildOptions = {
    format,
    bundle: true,
    sourcemap: true,
    logLevel: 'info',
    entryPoints: [manifest.source],
    external: dependencies,
    loader: Object.fromEntries(
      assetExtNames.map((extName) => {
        return [extName, 'dataurl']
      })
    ),
  }

  const packageMap = await filterDependencies(manifest).reduce(
    async (previousPackageMap, currentScopedPackageName) => {
      const packageMap = await previousPackageMap

      const packageName = getPackageName(currentScopedPackageName)
      const manifest = await getManifest(packageName)
      const packagePath = `../${packageName}/${dirname(manifest.typings)}`

      return packageMap.set(currentScopedPackageName, [packagePath])
    },
    Promise.resolve(new Map())
  )

  const typescriptOptions = {
    compilerOptions: {
      noEmit: false,
      paths: Object.fromEntries(packageMap),
      declarationDir: dirname(manifest.typings),
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
      outfile: manifest.module,
      plugins: [
        eslintPlugin(),
        typescriptPlugin({ typescriptOptions }),
        swcPlugin({ swcOptions }),
      ],
    }
  }

  return {
    ...buildOptions,
    outfile: manifest.main,
    plugins: [swcPlugin(swcOptions)],
  }
}

export default getBuildOptions
