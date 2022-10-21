import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Media } from '@21epub-ui/media'

export default {
  title: 'Media/Default',
  component: Media,
} as ComponentMeta<typeof Media>

const Template: ComponentStory<typeof Media> = (args) => <Media {...args} />

export const Default = Template.bind({})

Default.args = {
  src: '',
}
