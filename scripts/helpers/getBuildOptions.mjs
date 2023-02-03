import { readJson } from 'fs-extra/esm'
import { readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { env } from 'node:process'
import eslintPlugin from '../plugins/eslintPlugin.mjs'
import swcPlugin from '../plugins/swcPlugin.mjs'
import typescriptPlugin from '../plugins/typescriptPlugin.mjs'
import getPackageConfig from './getPackageConfig.mjs'

const projectPath = env.PROJECT_CWD

const assetExtNames = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp']

const getBuildOptions = async (format, incremental) => {
  const packageConfig = await readJson('package.json')
  const dependencies = Array.from(
    Object.keys({
      ...packageConfig.dependencies,
      ...packageConfig.peerDependencies,
    })
  )

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

  const names = await readdir(resolve(projectPath, 'packages'))

  const packageMap = await names.reduce(async (previousMap, currentName) => {
    const packageMap = await previousMap
    const packageConfig = await getPackageConfig(currentName)

    return packageMap.set(packageConfig.name, [dirname(packageConfig.typings)])
  }, Promise.resolve(new Map()))

  const typescriptOptions = {
    compilerOptions: {
      incremental,
      noEmit: false,
      paths: Object.fromEntries(packageMap),
      declarationDir: dirname(packageConfig.typings),
    },
  }

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
