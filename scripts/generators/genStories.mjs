import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genStories = (dirPath, { name }) => {
  const filePath = resolve(dirPath, 'stories', `${name}.stories.tsx`)

  const template = dedent(`
    import type { ComponentMeta, ComponentStory } from '@storybook/react'
    import { ${name} } from '../src'

    export default {
      title: '${name}/Default',
      component: ${name},
    } as ComponentMeta<typeof ${name}>

    const Template: ComponentStory<typeof ${name}> = (args) => {
      return <${name} {...args} />
    }

    export const Default = Template.bind({})

    Default.args = {}
  `)

  return fs.outputFile(filePath, template)
}

export default genStories
