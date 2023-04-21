import { Transformer } from '@21epub-ui/transformer'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

export const Default: StoryObj<typeof Transformer> = {
  args: {},
  render: (args) => {
    const [rect, setRect] = useState({
      left: (innerWidth - 200) / 2,
      top: (innerHeight - 150) / 2,
      width: 200,
      height: 150,
    })
    const [rotation, setRotation] = useState(0)

    return (
      <Transformer
        {...args}
        {...rect}
        rotation={rotation}
        onResize={({ left, top, width, height }) => {
          setRect({ left, top, width, height })
        }}
        onRotate={({ rotation }) => setRotation(rotation)}
      />
    )
  },
}

const meta: Meta<typeof Transformer> = {
  title: 'Transformer',
  component: Transformer,
}

export default meta
