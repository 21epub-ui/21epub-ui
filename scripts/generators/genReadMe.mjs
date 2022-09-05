import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'
import getName from '../utils/getName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import getPackageName from '../utils/getPackageName.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genReadMe = async () => {
  const name = getName()
  const packageName = await getPackageName()
  const componentName = kebabToPascal(name)

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'README.md')

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

  await fs.outputFile(filePath, template)
}

export default genReadMe
