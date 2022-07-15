import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { TextEditor } from '../src'

export default {
  title: 'TextEditor/Default',
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>

const Template: ComponentStory<typeof TextEditor> = (args) => (
  <TextEditor {...args} />
)

export const Default = Template.bind({})

Default.args = {}
