import { Uploader } from '@21epub-ui/uploader'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'

export const Default: StoryObj<typeof Uploader> = {
  args: {
    uploadUrl: '/v3/api/material/personal/',
  },
  render: (args) => {
    const [visible, setVisible] = useState(false)

    return (
      <>
        <Button onClick={() => setVisible(true)}>Upload</Button>
        <Uploader
          {...args}
          visible={visible}
          onVisibleChange={() => setVisible(false)}
        />
      </>
    )
  },
}

const meta: Meta<typeof Uploader> = {
  title: 'Uploader',
  component: Uploader,
}

export default meta
