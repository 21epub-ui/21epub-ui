import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'
import getName from '../utils/getName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genTemplate = async () => {
  const name = getName()
  const componentName = kebabToPascal(name)

  const dirPath = resolve(getPackagePath(name))
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

  await fs.outputFile(filePath, template)
}

export default genTemplate
