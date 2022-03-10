import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genReadMe = (dirPath, { packageName, componentName }) => {
  const filePath = resolve(dirPath, 'src', 'README.md')

  const template = dedent(`
    # ${packageName}

    ## Usage

    \`\`\`tsx
    import { ${componentName} } from '${packageName}'
    \`\`\`

    ### Examples

    \`\`\`tsx
    <${componentName} />
    \`\`\`
  `)

  return fs.outputFile(filePath, template)
}

export default genReadMe
