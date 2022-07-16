import { Box, ChakraProvider } from '@chakra-ui/react'
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import { useRef } from 'react'
import { chakraTheme, editorNodes, editorTheme } from '../../config'
import getRandomId from '../../utils/getRandomId'
import ToolbarPlugin from '../ToolbarPlugin'
import { Container } from './styles'

type LexicalComposerProps = Parameters<typeof LexicalComposer>[0]

interface ComposerProps
  extends Omit<LexicalComposerProps, 'children' | 'initialConfig'> {
  style?: React.CSSProperties
  className?: string
  initialConfig?: Partial<LexicalComposerProps['initialConfig']>
  placeholder?: React.ReactNode
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void
}

export const onError = (error: Error) => {
  throw error
}

export const TextEditor: React.FC<ComposerProps> = ({
  style,
  children,
  initialConfig,
  placeholder,
  onChange,
  ...props
}) => {
  const namespace = useRef(getRandomId(8))
  const scrollRef = useRef(null)

  return (
    <ChakraProvider theme={chakraTheme}>
      <LexicalComposer
        initialConfig={{
          onError,
          nodes: editorNodes,
          theme: editorTheme,
          namespace: namespace.current,
          ...initialConfig,
        }}
      >
        <Container style={style} {...props}>
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <Box ref={scrollRef} height="100%" padding="10px" overflow="auto">
                <Box as={ContentEditable} height="100%" outline="none" />
              </Box>
            }
            placeholder={
              <Box
                position="relative"
                bottom="1.7em"
                paddingLeft="10px"
                color="gray.500"
                fontSize="11pt"
                lineHeight="1.7"
                pointerEvents="none"
              >
                {placeholder}
              </Box>
            }
          />
          <OnChangePlugin
            ignoreSelectionChange
            onChange={(editorState, editor) => {
              onChange?.(editorState, editor)
            }}
          />
          <AutoScrollPlugin scrollRef={scrollRef} />
          <ClearEditorPlugin />
          <HistoryPlugin />
          <ListPlugin />
          {children}
        </Container>
      </LexicalComposer>
    </ChakraProvider>
  )
}

export default TextEditor
