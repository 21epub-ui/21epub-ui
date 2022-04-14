import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'
import { Uploader } from '../src'

export default {
  title: 'Uploader/Default',
  component: Uploader,
} as ComponentMeta<typeof Uploader>

const Template: ComponentStory<typeof Uploader> = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>Upload</Button>
      <Uploader visible={visible} onVisibleChange={() => setVisible(false)} />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}
