import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url'
import fs from 'fs-extra'
import { dirname, resolve } from 'path'

const packageConfig = await fs.readJson(resolve('package.json'))

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
      babel({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        rootMode: 'upward',
        babelHelpers: 'bundled',
      }),
      typescript({
        include: ['src/**/*', '../../typings/*'],
        declaration: true,
        declarationDir: dirname(packageConfig.typings),
      }),
    ],
  },
]
