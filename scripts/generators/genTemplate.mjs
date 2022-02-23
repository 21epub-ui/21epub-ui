import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genTemplate = (dirPath, { name }) => {
  const filePath = resolve(dirPath, 'src', 'components', name, 'index.tsx')

  const template = dedent(`
    import type { ${name}Props } from '../../index.types'

    const ${name}: React.FC<${name}Props> = ({ ...props }) => {
      return <div {...props} />
    }

    export default ${name}
  `)

  return fs.outputFile(filePath, template)
}

export default genTemplate
