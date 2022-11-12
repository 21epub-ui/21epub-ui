import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Transformer } from '@21epub-ui/transformer'
import { useState } from 'react'

export default {
  title: 'Transformer/Default',
  component: Transformer,
} as ComponentMeta<typeof Transformer>

const Template: ComponentStory<typeof Transformer> = (args) => {
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
}

export const Default = Template.bind({})

Default.args = {}
