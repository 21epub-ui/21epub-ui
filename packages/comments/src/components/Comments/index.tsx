import { ChakraProvider } from '@chakra-ui/react'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import type { CommentsProps } from '../../index.types'
import CommentRoom from '../CommentRoom'

const safeArea = {
  width: innerWidth - 42,
  height: innerHeight - 42,
}

const Comments: React.FC<CommentsProps> = ({ style, ...props }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  return (
    <ChakraProvider>
      <DndContext
        onDragEnd={({ delta }) => {
          const x = coordinates.x + delta.x
          const y = coordinates.y + delta.y

          setCoordinates({
            x: x < 0 ? 0 : x > safeArea.width ? safeArea.width : x,
            y: y < 0 ? 0 : y > safeArea.height ? safeArea.height : y,
          })
        }}
      >
        <CommentRoom style={style} coordinates={coordinates} {...props} />
      </DndContext>
    </ChakraProvider>
  )
}

export default Comments
