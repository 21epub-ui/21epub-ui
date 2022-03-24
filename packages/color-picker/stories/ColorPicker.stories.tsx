import type { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import { useState } from 'react'
import { ColorPicker } from '../src'

export default {
  title: 'ColorPicker/Default',
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>

export const Default: ComponentStory<typeof ColorPicker> = () => {
  const [color, setColor] = useState<string>()

  return <ColorPicker color={color} onChange={setColor} />
}
