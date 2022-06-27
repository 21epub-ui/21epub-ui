import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genTypes = (dirPath, { componentName }) => {
  const filePath = resolve(dirPath, 'src', 'index.types.ts')

  const template = dedent(`
    export interface ${componentName}Props {}
  `)

  return fs.outputFile(filePath, template)
}

export default genTypes
