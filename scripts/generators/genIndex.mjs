import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genIndex = (dirPath, { name }) => {
  const filePath = resolve(dirPath, 'src', 'index.ts')

  const template = dedent(`
    export * from './index.types'
    export { default as ${name} } from './components/${name}'
  `)

  return fs.outputFile(filePath, template)
}

export default genIndex
