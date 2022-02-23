import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genTypesIndex = (dirPath, { name }) => {
  const filePath = resolve(dirPath, 'src', 'index.types.ts')

  const template = dedent(`
    export interface ${name}Props {}
  `)

  return fs.outputFile(filePath, template)
}

export default genTypesIndex
