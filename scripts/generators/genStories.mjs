import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genStories = (dirPath, { componentName }) => {
  const filePath = resolve(dirPath, 'stories', `${componentName}.stories.tsx`)

  const template = dedent(`
    import type { ComponentMeta, ComponentStory } from '@storybook/react'
    import { ${componentName} } from '../src'

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

  return fs.outputFile(filePath, template)
}

export default genStories
