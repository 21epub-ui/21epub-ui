import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $isRootTextContentEmpty } from '@lexical/text'
import type {
  LexicalEditor,
  SerializedElementNode,
  SerializedLexicalNode,
} from 'lexical'
import { onError } from '../components/TextEditor'
import { editorNodes } from '../config'
import getRandomId from '../utils/getRandomId'
import isParagraphNode from './isParagraphNode'

const processNodes = async (
  elementNode: SerializedElementNode,
  processor?: (node: SerializedLexicalNode) => void | Promise<void>
) => {
  for await (const node of elementNode.children) {
    if (isParagraphNode(node)) {
      await processNodes(node, processor)
      return
    }

    await processor?.(node)
  }
}

const headlessEditor = createHeadlessEditor({
  onError,
  nodes: editorNodes,
  namespace: getRandomId(8),
})

const generateHtmlFromEditor = async (
  editor: LexicalEditor,
  processor?: (node: SerializedLexicalNode) => void | Promise<void>
) => {
  const serializedState = editor.getEditorState().toJSON()

  const isEditorEmpty = $isRootTextContentEmpty(editor.isComposing(), true)

  if (isEditorEmpty) return ''

  await processNodes(serializedState.root, processor)

  headlessEditor.update(() => {
    const editorState = headlessEditor.parseEditorState(serializedState)
    headlessEditor.setEditorState(editorState)
  })

  return new Promise<string>((resolve) => {
    headlessEditor.update(() => {
      resolve($generateHtmlFromNodes(headlessEditor, null))
    })
  })
}

export default generateHtmlFromEditor
