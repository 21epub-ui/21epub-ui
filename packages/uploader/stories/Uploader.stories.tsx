import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'
import { Uploader } from '@21epub-ui/uploader'

export default {
  title: 'Uploader/Default',
  component: Uploader,
} as ComponentMeta<typeof Uploader>

const Template: ComponentStory<typeof Uploader> = (args) => {
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
}

export const Default = Template.bind({})

Default.args = {
  uploadUrl: '/v3/api/material/personal/',
}
