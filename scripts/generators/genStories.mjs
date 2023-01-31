import fs from 'fs-extra'
import { resolve } from 'node:path'
import getName from '../helpers/getName.mjs'
import getPackageName from '../helpers/getPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import dedent from '../utils/dedent.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genStories = async () => {
  const name = getName()
  const packageName = await getPackageName()
  const componentName = kebabToPascal(name)

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'stories', `${componentName}.stories.tsx`)

  const template = dedent(`
    import type { ComponentMeta, ComponentStory } from '@storybook/react'
    import { ${componentName} } from '${packageName}'

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

  await fs.outputFile(filePath, template)
}

export default genStories
