import type { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import { QuickAccess } from '../src'

export default {
  title: 'QuickAccess/Default',
  component: QuickAccess,
} as ComponentMeta<typeof QuickAccess>

const Template: ComponentStory<typeof QuickAccess> = (args) => (
  <QuickAccess {...args} />
)

export const Default = Template.bind({})

Default.args = { type: 'cbt' }
