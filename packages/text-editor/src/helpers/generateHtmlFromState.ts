import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
} from 'lexical'
import { nanoid } from 'nanoid'
import { onError } from '../components/TextEditor'
import { editorNodes, editorTheme } from '../config'
import isParagraphNode from './isParagraphNode'

const processNodes = async (
  elementNode: SerializedElementNode,
  processor?: (node: SerializedLexicalNode) => void | Promise<void>
) => {
  for await (const node of elementNode.children) {
    if (isParagraphNode(node)) {
      await processNodes(node, processor)
    }

    await processor?.(node)
  }
}

const headlessEditor = createHeadlessEditor({
  onError,
  nodes: editorNodes,
  theme: editorTheme,
  namespace: nanoid(8),
})

const generateHtmlFromState = async (
  serializedState: SerializedEditorState,
  processor?: (node: SerializedLexicalNode) => void | Promise<void>
) => {
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

export default generateHtmlFromState
