import { ChakraProvider } from '@chakra-ui/react'
import type { Modifier } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import { chakraTheme } from '../../config'
import type { CommentsProps } from '../../index.types'
import CommentRoom from '../CommentRoom'

const Comments: React.FC<CommentsProps> = ({ style, ...props }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  const restrict: Modifier = ({ transform, draggingNodeRect }) => {
    const x = transform.x + coordinates.x
    const y = transform.y + coordinates.y

    if (draggingNodeRect === null) return { ...transform, x, y }

    const safeArea = {
      top: innerHeight - 42,
      left: innerWidth - 42,
    }

    const getCoordinate = (axis: 'x' | 'y', offset: number) => {
      const edge = axis === 'x' ? 'left' : 'top'
      const distance = draggingNodeRect[edge] + offset

      if (distance < 0) return -draggingNodeRect[edge]

      if (distance > safeArea[edge]) {
        return safeArea[edge] - draggingNodeRect[edge]
      }

      return offset
    }

    return {
      ...transform,
      x: getCoordinate('x', x),
      y: getCoordinate('y', y),
    }
  }

  return (
    <ChakraProvider theme={chakraTheme}>
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
