import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import type { HeadingTagType } from '@lexical/rich-text'
import type { EditorState, LexicalEditor } from 'lexical'

export type TagType = 'p' | HeadingTagType

export type MediaType = 'image'

export interface MediaPayload {
  src: string
  title: string
}

type InitialConfig = Partial<Omit<InitialConfigType, 'editable'>>

export interface TextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean
  placeholder?: string
  initialConfig?: InitialConfig
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void
  onInsert?: (
    type: MediaType,
    callback: (payload: MediaPayload) => void
  ) => void
}
