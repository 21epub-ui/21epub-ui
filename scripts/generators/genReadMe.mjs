import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getName from '../helpers/getName.mjs'
import getPackageName from '../helpers/getPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
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

  await outputFile(filePath, template)
}

export default genReadMe
