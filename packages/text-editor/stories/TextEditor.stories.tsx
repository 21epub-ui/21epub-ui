import type { MediaPayload } from '@21epub-ui/text-editor'
import { TextEditor } from '@21epub-ui/text-editor'
import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'

export const Default: StoryObj<typeof TextEditor> = {
  args: {
    style: { height: innerHeight - 32 },
  },
  render: (args) => {
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
          {...args}
          onInsert={(type, callback) => {
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
  },
}

const meta: Meta<typeof TextEditor> = {
  title: 'TextEditor',
  component: TextEditor,
}

export default meta
