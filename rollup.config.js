import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url'
import fs from 'fs'
import { resolve } from 'path'

const extensions = ['.ts', '.tsx', '.js', '.jsx']
const inputPath = resolve('src')
const outputDir = 'dist'

export default [
  {
    input: extensions
      .map((ext) => resolve(inputPath, `index${ext}`))
      .find((file) => fs.existsSync(file)),
    output: [
      {
        dir: outputDir,
        sourcemap: true,
        format: 'cjs',
      },
      {
        file: `${outputDir}/index.esm.js`,
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins: [
      eslint(),
      url(),
      babel({
        extensions,
        rootMode: 'upward',
        babelHelpers: 'bundled',
      }),
      typescript({
        include: ['src/**/*', '../../typings/*'],
        declaration: true,
        declarationDir: outputDir,
      }),
    ],
  },
]
