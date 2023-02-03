import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genIndex = async () => {
  const packageName = getFirstArgv()
  const componentName = kebabToPascal(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'src', 'index.ts')

  const template = dedent(`
    export * from './index.types'
    export { default as ${componentName} } from './components/${componentName}'
  `)

  await outputFile(filePath, template)
}

export default genIndex
