import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useRef } from 'react'
import type { LexicalEditor } from '../src'
import { editorCommands, TextEditor } from '../src'
import type { InsertImagePayload } from '../src/plugins/ImagePlugin'

export default {
  title: 'TextEditor/Default',
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>

const Template: ComponentStory<typeof TextEditor> = (args) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleInsertRef = useRef<(file: File) => void>()

  const insertImage = (file: File, editor: LexicalEditor) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const src = e.target?.result

      if (typeof src !== 'string') return

      editor.update(() => {
        editor.dispatchCommand<InsertImagePayload>(editorCommands.insertImage, {
          src,
          title: file.name,
        })
      })
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <>
      <TextEditor
        style={{ height: innerHeight - 32 }}
        {...args}
        onDispatchCommand={(commend, editor) => {
          if (commend === 'insertImage') {
            inputRef.current?.click()
            handleInsertRef.current = (file) => insertImage(file, editor)
          }
        }}
      />
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          if (file === undefined) return

          handleInsertRef.current?.(file)
          e.currentTarget.value = ''
        }}
      />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}
