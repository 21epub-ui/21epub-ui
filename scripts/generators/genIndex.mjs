import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genIndex = (dirPath, { componentName }) => {
  const filePath = resolve(dirPath, 'src', 'index.ts')

  const template = dedent(`
    export * from './index.types'
    export { default as ${componentName} } from './components/${componentName}'
  `)

  return fs.outputFile(filePath, template)
}

export default genIndex
