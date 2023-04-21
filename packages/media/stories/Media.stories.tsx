import type { Meta, StoryObj } from '@storybook/react'
import { Media } from '@21epub-ui/media'

export const Default: StoryObj<typeof Media> = {
  args: {
    src: '',
  },
}

const meta: Meta<typeof Media> = {
  title: 'Media',
  component: Media,
}

export default meta
