import type { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/antd.css'
import { QuickAccess } from '@21epub-ui/quick-access'

export const Default: StoryObj<typeof QuickAccess> = {
  args: {
    type: 'cbt',
  },
}

const meta: Meta<typeof QuickAccess> = {
  title: 'QuickAccess',
  component: QuickAccess,
}

export default meta
