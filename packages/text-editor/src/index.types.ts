import type { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { HeadingTagType } from '@lexical/rich-text'
import type { EditorState, LexicalEditor, SerializedEditorState } from 'lexical'
import type { CSSProperties, ReactNode } from 'react'

export type TagType = 'p' | HeadingTagType

export type MediaType = 'image'

export interface MediaPayload {
  src: string
  title: string
}

type LexicalComposerProps = Parameters<typeof LexicalComposer>[0]

type OmittedInitialConfig = 'editable' | 'editorState'

type InitialConfig = Partial<
  Omit<LexicalComposerProps['initialConfig'], OmittedInitialConfig>
>

export interface TextEditorProps
  extends Omit<LexicalComposerProps, 'children' | 'initialConfig'> {
  style?: CSSProperties
  className?: string
  children?: ReactNode
  disabled?: boolean
  initialConfig?: InitialConfig
  initialState?: SerializedEditorState | ((editor: LexicalEditor) => void)
  placeholder?: ReactNode
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void
  onInsert?: (
    type: MediaType,
    callback: (payload: MediaPayload) => void
  ) => void
}
