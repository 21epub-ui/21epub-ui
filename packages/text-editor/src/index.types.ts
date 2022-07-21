import type { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { EditorState, LexicalEditor, SerializedEditorState } from 'lexical'
import type { CSSProperties, ReactNode } from 'react'

type LexicalComposerProps = Parameters<typeof LexicalComposer>[0]

type OmittedInitialConfig = 'readOnly' | 'editorState'

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
}
