import { ChakraProvider } from '@chakra-ui/react'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import type { CommentsProps } from '../../index.types'
import CommentRoom from '../CommentRoom'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

const Comments: React.FC<CommentsProps> = ({ style, ...props }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  return (
    <ChakraProvider>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragEnd={({ delta }) => {
          const x = coordinates.x + delta.x
          const y = coordinates.y + delta.y

          setCoordinates({ x, y })
        }}
      >
        <CommentRoom style={style} coordinates={coordinates} {...props} />
      </DndContext>
    </ChakraProvider>
  )
}

export default Comments
