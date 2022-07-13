import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Comments } from '../src'

export default {
  title: 'Comments/Default',
  component: Comments,
} as ComponentMeta<typeof Comments>

const Template: ComponentStory<typeof Comments> = (args) => (
  <Comments isOpen={true} style={{ height: innerHeight - 32 }} {...args} />
)

export const Default = Template.bind({})

Default.args = {}
