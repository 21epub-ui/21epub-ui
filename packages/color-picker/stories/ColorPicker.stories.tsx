import type { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import { ColorPicker } from '../src'

export default {
  title: 'ColorPicker/Default',
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>

const Template: ComponentStory<typeof ColorPicker> = (args) => (
  <ColorPicker {...args} />
)

export const Default = Template.bind({})

Default.args = {}
