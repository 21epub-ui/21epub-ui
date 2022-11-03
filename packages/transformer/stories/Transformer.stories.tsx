import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Transformer } from '@21epub-ui/transformer'

export default {
  title: 'Transformer/Default',
  component: Transformer,
} as ComponentMeta<typeof Transformer>

const Template: ComponentStory<typeof Transformer> = (args) => (
  <Transformer {...args} />
)

export const Default = Template.bind({})

Default.args = {}
