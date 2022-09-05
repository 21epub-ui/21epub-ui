import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'
import getName from '../utils/getName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genTypes = async () => {
  const name = getName()
  const componentName = kebabToPascal(name)

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'src', 'index.types.ts')

  const template = dedent(`
    export interface ${componentName}Props {}
  `)

  await fs.outputFile(filePath, template)
}

export default genTypes
