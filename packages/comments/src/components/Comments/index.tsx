import { ChakraProvider } from '@chakra-ui/react'
import type { Modifier } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import type { CommentsProps } from '../../index.types'
import CommentRoom from '../CommentRoom'

const Comments: React.FC<CommentsProps> = ({ style, ...props }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  const restrict: Modifier = ({ transform }) => {
    const x = transform.x + coordinates.x
    const y = transform.y + coordinates.y
    const safeWeight = innerWidth - 42
    const safeHeight = innerHeight - 42

    return {
      ...transform,
      x: x < 0 ? 0 : x > safeWeight ? safeWeight : x,
      y: y < 0 ? 0 : y > safeHeight ? safeHeight : y,
    }
  }

  return (
    <ChakraProvider>
      <DndContext
        modifiers={[restrict]}
        onDragEnd={({ delta }) => setCoordinates(delta)}
      >
        <CommentRoom style={style} coordinates={coordinates} {...props} />
      </DndContext>
    </ChakraProvider>
  )
}

export default Comments
