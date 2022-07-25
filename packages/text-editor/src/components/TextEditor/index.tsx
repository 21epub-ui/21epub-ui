import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useRef } from 'react'
import {
  chakraTheme,
  editorNodes,
  editorStyles,
  editorTheme,
} from '../../config'
import type { TextEditorProps } from '../../index.types'
import HorizontalRulePlugin from '../../plugins/HorizontalRulePlugin'
import ImagePlugin from '../../plugins/ImagePlugin'
import ToolbarPlugin from '../../plugins/ToolbarPlugin'
import getRandomId from '../../utils/getRandomId'
import { Editor } from './styles'

export const onError = (error: Error) => {
  console.error(error)
}

export const TextEditor: React.FC<TextEditorProps> = ({
  style,
  children,
  disabled,
  initialConfig,
  initialState,
  placeholder,
  onChange,
  onUpload,
  ...props
}) => {
  const namespace = useRef(getRandomId(8))
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <ChakraProvider theme={chakraTheme}>
      <LexicalComposer
        initialConfig={{
          onError,
          readOnly: disabled,
          nodes: editorNodes,
          theme: editorTheme,
          namespace: namespace.current,
          editorState: (editor) => {
            if (!initialState) return

            if (typeof initialState === 'function') {
              initialState(editor)
            } else {
              editor.setEditorState(editor.parseEditorState(initialState))
            }
          },
          ...initialConfig,
        }}
      >
        <Flex
          flexDirection="column"
          borderRadius="md"
          color="gray.700"
          fontSize="xs"
          lineHeight="1"
          backgroundColor="white"
          style={style}
          {...props}
        >
          <ToolbarPlugin disabled={disabled} onUpload={onUpload} />
          <RichTextPlugin
            contentEditable={
              <Box ref={scrollRef} height="100%" padding="10px" overflow="auto">
                <Editor as={ContentEditable} />
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
          <AutoFocusPlugin />
          <AutoScrollPlugin scrollRef={scrollRef} />
          <ClearEditorPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <HorizontalRulePlugin />
          <ImagePlugin />
          {children}
        </Flex>
      </LexicalComposer>
    </ChakraProvider>
  )
}

export default TextEditor
