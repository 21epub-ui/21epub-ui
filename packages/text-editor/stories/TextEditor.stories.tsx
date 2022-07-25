import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useRef } from 'react'
import type { MediaPayload } from '../src'
import { TextEditor } from '../src'

export default {
  title: 'TextEditor/Default',
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>

const Template: ComponentStory<typeof TextEditor> = (args) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onInsertRef = useRef<(file: File) => void>()

  const insertImage = (
    file: File,
    callback: (payload: MediaPayload) => void
  ) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const src = e.target?.result

      if (typeof src !== 'string') return

      callback({ src, title: file.name })
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <>
      <TextEditor
        style={{ height: innerHeight - 32 }}
        {...args}
        onUpload={(type, callback) => {
          if (type === 'image') {
            inputRef.current?.click()
            onInsertRef.current = (file) => insertImage(file, callback)
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

          onInsertRef.current?.(file)
          e.currentTarget.value = ''
        }}
      />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}
