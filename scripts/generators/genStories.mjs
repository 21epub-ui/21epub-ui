import { outputFile } from 'fs-extra/esm'
import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getScopedPackageName from '../helpers/getScopedPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genStories = async () => {
  const packageName = getFirstArgv()
  const scopedPackageName = await getScopedPackageName(packageName)
  const componentName = kebabToPascal(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'stories', `${componentName}.stories.tsx`)

  const template = dedent(`
    import type { ComponentMeta, ComponentStory } from '@storybook/react'
    import { ${componentName} } from '${scopedPackageName}'

    export default {
      title: '${componentName}/Default',
      component: ${componentName},
    } as ComponentMeta<typeof ${componentName}>

    const Template: ComponentStory<typeof ${componentName}> = (args) => (
      <${componentName} {...args} />
    )

    export const Default = Template.bind({})

    Default.args = {}
  `)

  await outputFile(filePath, template)
}

export default genStories
