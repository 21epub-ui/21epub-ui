import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import dedent from '../utils/dedent.mjs'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genTemplate = async () => {
  const packageName = getFirstArgv()
  const componentName = kebabToPascal(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(
    dirPath,
    'src',
    'components',
    componentName,
    'index.tsx'
  )

  const template = dedent(`
    import type { ${componentName}Props } from '../../index.types'

    const ${componentName}: React.FC<${componentName}Props> = ({ ...props }) => {
      return <div {...props} />
    }

    export default ${componentName}
  `)

  await outputFile(filePath, template)
}

export default genTemplate
