import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getScopedPackageName from '../helpers/getScopedPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genStories = async (packageName) => {
  const scopedPackageName = await getScopedPackageName(packageName)
  const componentName = kebabToPascal(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'stories', `${componentName}.stories.tsx`)

  const template = dedent(`
    import type { Meta, StoryObj } from '@storybook/react'
    import { ${componentName} } from '${scopedPackageName}'

    export const Default: StoryObj<typeof ${componentName}> = {
      args: {},
    }

    const meta: Meta<typeof ${componentName}> = {
      title: '${componentName}',
      component: ${componentName},
    }

    export default meta
  `)

  await outputFile(filePath, template)
}

export default genStories
