import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genTemplate = (dirPath, { componentName }) => {
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

  return fs.outputFile(filePath, template)
}

export default genTemplate
