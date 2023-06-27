import { Uploader } from '@21epub-ui/uploader'
import type { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/antd.css'

export const Default: StoryObj<typeof Uploader> = {
  args: {
    visible: true,
    uploadUrl: '/v3/api/material/personal/',
  },
}

const meta: Meta<typeof Uploader> = {
  title: 'Uploader',
  component: Uploader,
}

export default meta
