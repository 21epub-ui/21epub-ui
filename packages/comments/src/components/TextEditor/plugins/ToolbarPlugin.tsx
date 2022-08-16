import { Button, Flex, IconButton } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { LexicalEditor } from 'lexical'
import { useEffect, useRef } from 'react'
import { ImageIcon } from '../../Icons'
import { INSERT_IMAGE_COMMAND } from './ImagePlugin'

interface ToolbarPluginProps {
  disabled?: boolean
  onSave?: (editor: LexicalEditor) => void
}

const ToolbarPlugin: React.FC<ToolbarPluginProps> = ({ disabled, onSave }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (disabled !== undefined) editor.setReadOnly(disabled)
  }, [disabled, editor])

  const fileInput = useRef<HTMLInputElement>(null)

  const insertImage = (file: File) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const src = e.target?.result

      if (typeof src !== 'string') return

      editor.focus(() => {
        editor.update(() => {
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src,
            title: file.name,
          })
        })
      })
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <Flex
      align="center"
      borderTop="1px solid #d0d0d0"
      paddingTop="12px"
      marginTop="12px"
    >
      <IconButton
        disabled={disabled}
        aria-label="添加图片"
        icon={<ImageIcon />}
        onClick={() => {
          fileInput.current?.click()
        }}
      />
      <Button
        disabled={disabled}
        variant="solid"
        colorScheme="twitter"
        fontWeight="normal"
        marginLeft="auto"
        onClick={() => {
          onSave?.(editor)
        }}
      >
        {disabled ? '发送中' : '发送'}
      </Button>
      <input
        style={{ display: 'none' }}
        ref={fileInput}
        type="file"
        accept={['.jpg', '.gif', '.png', '.svg', '.jpeg'].join()}
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          if (file === undefined) return
          insertImage(file)
          e.currentTarget.value = ''
        }}
      />
    </Flex>
  )
}

export default ToolbarPlugin
