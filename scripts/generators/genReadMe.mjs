import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getScopedPackageName from '../helpers/getScopedPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genReadMe = async () => {
  const packageName = getFirstArgv()
  const scopedPackageName = await getScopedPackageName(packageName)
  const componentName = kebabToPascal(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'README.md')

  const template = dedent(`
    # ${scopedPackageName}

    ## Usage

    \`\`\`tsx
    import { ${componentName} } from '${scopedPackageName}'
    \`\`\`

    ### Examples

    \`\`\`tsx
    <${componentName} />
    \`\`\`
  `)

  await outputFile(filePath, template)
}

export default genReadMe
