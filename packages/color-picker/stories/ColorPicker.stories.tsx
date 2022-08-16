import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import type { Colord } from '../src'
import { ColorPicker } from '../src'

export default {
  title: 'ColorPicker/Default',
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>

export const Default: ComponentStory<typeof ColorPicker> = (args) => {
  const [color, setColor] = useState<Colord>()

  return (
    <ColorPicker {...args} defaultColor={color} onChange={setColor}>
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '1px solid var(--chakra-colors-gray-200)',
          borderRadius: '2px',
          backgroundColor: color?.toRgbString(),
          cursor: 'pointer',
        }}
      />
    </ColorPicker>
  )
}

Default.args = {}
