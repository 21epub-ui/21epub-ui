import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import type { TransactionSpec } from '@codemirror/state'
import { Compartment, EditorState } from '@codemirror/state'
import {
  EditorView,
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view'
import { useEffect, useRef } from 'react'
import type { CodeEditorProps } from '../../index.types'

const CodeEditor: React.FC<CodeEditorProps> = ({
  disabled,
  readonly,
  initialConfig,
  onChange,
  ...props
}) => {
  const editorViewRef = useRef<EditorView | null>(null)
  const codeElementRef = useRef<HTMLDivElement>(null)
  const compartmentsRef = useRef({
    disabled: new Compartment(),
    readonly: new Compartment(),
  })

  const contextRef = useRef({
    disabled,
    readonly,
    initialConfig,
    onChange,
  })

  contextRef.current.disabled = disabled
  contextRef.current.readonly = readonly
  contextRef.current.initialConfig = initialConfig
  contextRef.current.onChange = onChange

  useEffect(() => {
    if (codeElementRef.current === null) return

    const context = contextRef.current
    const initialConfig = context.initialConfig
    const extensions = initialConfig?.extensions ?? []
    const compartments = compartmentsRef.current

    const editorView = new EditorView({
      ...initialConfig,
      parent: codeElementRef.current,
      dispatch: (transaction) => {
        if (context.disabled) return

        editorView.update([transaction])

        if (transaction.docChanged) {
          context.onChange?.(editorView.state, editorView)
        }
      },
      extensions: [
        ...extensions,
        compartments.disabled.of(EditorView.editable.of(!context.disabled)),
        compartments.readonly.of(
          EditorState.readOnly.of(context.readonly ?? false)
        ),
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
      ],
    })

    editorViewRef.current = editorView

    return () => {
      editorView.destroy()
      editorViewRef.current = null
    }
  }, [])

  const updateEditorState = (...specs: TransactionSpec[]) => {
    const editorView = editorViewRef.current

    if (editorView === null) return

    editorView.update([editorView.state.update(...specs)])
  }

  useEffect(() => {
    updateEditorState({
      effects: compartmentsRef.current.disabled.reconfigure(
        EditorView.editable.of(!disabled)
      ),
    })
  }, [disabled])

  useEffect(() => {
    updateEditorState({
      effects: compartmentsRef.current.readonly.reconfigure(
        EditorState.readOnly.of(readonly ?? false)
      ),
    })
  }, [readonly])

  return <code ref={codeElementRef} {...props} />
}

export default CodeEditor
