import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getName from '../helpers/getName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genTypes = async () => {
  const name = getName()
  const componentName = kebabToPascal(name)

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'src', 'index.types.ts')

  const template = dedent(`
    export interface ${componentName}Props {}
  `)

  await outputFile(filePath, template)
}

export default genTypes
