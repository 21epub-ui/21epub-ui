import type { EditorState, Extension } from '@codemirror/state'
import type { EditorView, EditorViewConfig } from '@codemirror/view'

interface InitialConfig
  extends Omit<EditorViewConfig, 'parent' | 'extensions'> {
  extensions?: Extension[]
}

export interface CodeEditorProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  disabled?: boolean
  readonly?: boolean
  initialConfig?: InitialConfig
  onChange?: (editorState: EditorState, editorView: EditorView) => void
}
