import type { Colord } from '@21epub-ui/color-picker'
import { ColorPicker } from '@21epub-ui/color-picker'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

export const Default: StoryObj<typeof ColorPicker> = {
  args: {},
  render: (args) => {
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
  },
}

const meta: Meta<typeof ColorPicker> = {
  title: 'ColorPicker',
  component: ColorPicker,
}

export default meta
