import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Tree } from '../src'

export default {
  title: 'Tree/Default',
  component: Tree,
} as ComponentMeta<typeof Tree>

const Template: ComponentStory<typeof Tree> = (args) => <Tree {...args} />

export const Default = Template.bind({})

Default.args = {}
