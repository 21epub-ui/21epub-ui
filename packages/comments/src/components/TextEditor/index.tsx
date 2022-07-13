import { Box, Flex } from '@chakra-ui/react'
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import type { LexicalEditor } from 'lexical'
import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'
import { ImageNode } from './nodes/ImageNode'
import ImagesPlugin from './plugins/ImagesPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'

const onError = (error: Error) => {
  throw error
}

interface TextEditorProps {
  className?: string
  style?: CSSProperties
  disabled?: boolean
  placeholder?: ReactNode
  namespace: string
  onSave?: (editor: LexicalEditor) => void
}

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  style,
  disabled,
  namespace,
  placeholder,
  children,
  onSave,
}) => {
  const ref = useRef(null)

  return (
    <LexicalComposer initialConfig={{ namespace, onError, nodes: [ImageNode] }}>
      <Flex flexDirection="column" className={className} style={style}>
        <PlainTextPlugin
          contentEditable={
            <Box ref={ref} fontSize="small" maxHeight="105px" overflow="auto">
              <ContentEditable style={{ outline: 'none' }} />
            </Box>
          }
          placeholder={
            <Box
              color="gray.500"
              fontSize="small"
              position="absolute"
              pointerEvents="none"
            >
              {placeholder}
            </Box>
          }
        />
        <AutoScrollPlugin scrollRef={ref} />
        <ClearEditorPlugin />
        <HistoryPlugin />
        <ImagesPlugin />
        <ToolbarPlugin disabled={disabled} onSave={onSave} />
        {children}
      </Flex>
    </LexicalComposer>
  )
}

export default TextEditor
