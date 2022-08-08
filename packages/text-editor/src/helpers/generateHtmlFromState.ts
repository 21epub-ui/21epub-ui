import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $isRootTextContentEmpty } from '@lexical/text'
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
} from 'lexical'
import { onError } from '../components/TextEditor'
import { editorNodes, editorTheme } from '../config'
import getRandomId from '../utils/getRandomId'
import hasImageNode from './hasImageNode'
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
  namespace: getRandomId(8),
})

const generateHtmlFromState = async (
  serializedState: SerializedEditorState,
  processor?: (node: SerializedLexicalNode) => void | Promise<void>
) => {
  const isEditorEmpty =
    !hasImageNode(serializedState.root) && $isRootTextContentEmpty(false, true)

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

export default generateHtmlFromState