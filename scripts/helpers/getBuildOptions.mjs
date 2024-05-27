import browserslist from 'browserslist'
import { readJson } from 'fs-extra/esm'
import { dirname } from 'node:path'
import { cwd, env } from 'node:process'
import eslintPlugin from '../plugins/eslintPlugin.mjs'
import swcPlugin from '../plugins/swcPlugin.mjs'
import typescriptPlugin from '../plugins/typescriptPlugin.mjs'
import getManifest from './getManifest.mjs'
import getPackageName from './getPackageName.mjs'
import getTypescriptOptions from './getTypescriptOptions.mjs'
import getPackages from './getPackages.mjs'

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
  const packages = await getPackages(manifest.name)

  const buildOptions = {
    format,
    bundle: true,
    sourcemap: true,
    logLevel: 'info',
    entryPoints: [manifest.source],
    external: packages,
    packages: 'external',
    loader: Object.fromEntries(
      assetExtNames.map((extName) => {
        return [extName, 'dataurl']
      })
    ),
  }

  const packagePaths = await Promise.all(
    packages.map(async (scopedPackageName) => {
      const packageName = getPackageName(scopedPackageName)
      const manifest = await getManifest(packageName)
      const packagePath = `../${packageName}/${dirname(manifest.typings)}`

      return [scopedPackageName, [packagePath]]
    })
  )

  const typescriptOptions = {
    compilerOptions: {
      noEmit: false,
      paths: Object.fromEntries(packagePaths),
      declarationDir: dirname(manifest.typings),
    },
  }

  const basePath = cwd()

  const swcOptions = {
    rootMode: 'upward',
    jsc: {
      transform: {
        react: {
          importSource: getTypescriptOptions(basePath)?.jsxImportSource,
        },
      },
    },
    env: {
      targets: browserslist.loadConfig({ path: basePath, env: env.NODE_ENV }),
    },
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
    plugins: [swcPlugin({ swcOptions })],
  }
}

export default getBuildOptions
