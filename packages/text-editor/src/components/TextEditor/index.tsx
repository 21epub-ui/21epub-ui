import { Box, ChakraProvider } from '@chakra-ui/react'
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import { useRef } from 'react'
import {
  chakraTheme,
  editorNodes,
  editorStyles,
  editorTheme,
} from '../../config'
import getRandomId from '../../utils/getRandomId'
import ToolbarPlugin from '../ToolbarPlugin'
import { Container } from './styles'

type LexicalComposerProps = Parameters<typeof LexicalComposer>[0]

type OmittedInitialConfig = 'readOnly' | 'editorState'

type InitialConfig = Partial<
  Omit<LexicalComposerProps['initialConfig'], OmittedInitialConfig>
>

interface ComposerProps extends Omit<LexicalComposerProps, 'initialConfig'> {
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  initialConfig?: InitialConfig
  initialState?: InitialEditorStateType
  placeholder?: React.ReactNode
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void
}

export const onError = (error: Error) => {
  throw error
}

export const TextEditor: React.FC<ComposerProps> = ({
  style,
  children,
  disabled,
  initialConfig,
  initialState,
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
          readOnly: disabled,
          nodes: editorNodes,
          theme: editorTheme,
          namespace: namespace.current,
          editorState: initialState,
          ...initialConfig,
        }}
      >
        <Container style={style} {...props}>
          <ToolbarPlugin disabled={disabled} />
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
                fontSize={editorStyles.fontSize}
                lineHeight={editorStyles.lineHeight}
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
