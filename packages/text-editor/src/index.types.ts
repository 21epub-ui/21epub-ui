import type {
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import type { EditorState, LexicalEditor } from 'lexical'

type LexicalComposerProps = Parameters<typeof LexicalComposer>[0]

type OmittedInitialConfig = 'readOnly' | 'editorState'

type InitialConfig = Partial<
  Omit<LexicalComposerProps['initialConfig'], OmittedInitialConfig>
>

export interface TextEditorProps
  extends Omit<LexicalComposerProps, 'children' | 'initialConfig'> {
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  initialConfig?: InitialConfig
  initialState?: InitialEditorStateType
  placeholder?: React.ReactNode
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void
}
