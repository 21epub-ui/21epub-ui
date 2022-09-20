import { babel } from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url'
import { execute } from '@yarnpkg/shell'
import fs from 'fs-extra'
import { dirname, resolve } from 'path'

const packageConfig = await fs.readJson(resolve('package.json'))
const dependencies = Object.entries(packageConfig.dependencies ?? {}).filter(
  (dependency) => /^workspace/.test(dependency[1])
)

await Promise.all(
  dependencies.map((dependency) => {
    return execute(`yarn workspace ${dependency[0]} run build`)
  })
)

export default [
  {
    input: packageConfig.source,
    output: [
      {
        dir: dirname(packageConfig.main),
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: packageConfig.module,
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins: [
      url(),
      eslint(),
      typescript({
        include: ['src/**/*', '../../typings/*'],
        declaration: true,
        declarationDir: dirname(packageConfig.typings),
        paths: {},
      }),
      babel({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        rootMode: 'upward',
        babelHelpers: 'bundled',
      }),
    ],
  },
]
