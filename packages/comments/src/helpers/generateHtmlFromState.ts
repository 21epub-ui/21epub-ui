import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import type {
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'
import type { SerializedParagraphNode } from 'lexical/nodes/LexicalParagraphNode'
import uploadFile from '../api/uploadFile'
import { ImageNode } from '../components/TextEditor/nodes/ImageNode'

interface SerializedImageNode extends SerializedLexicalNode {
  src: string
  title: string
}

export const isParagraphNode = (
  node: SerializedLexicalNode
): node is SerializedParagraphNode => {
  return node.type === 'paragraph'
}

export const isTextNode = (
  node: SerializedLexicalNode
): node is SerializedTextNode => {
  return node.type === 'text'
}

export const isImageNode = (
  node: SerializedLexicalNode
): node is SerializedImageNode => {
  return node.type === 'image'
}

const getFileType = (data: string) => {
  const start = data.indexOf(':') + 1
  const end = data.indexOf(';')

  return data.slice(start, end)
}

const processNodes = async (elementNode: SerializedElementNode) => {
  for await (const node of elementNode.children) {
    if (isParagraphNode(node)) {
      await processNodes(node)
      return
    }

    if (isTextNode(node)) {
      node.text = node.text.trimEnd()
      return
    }

    if (isImageNode(node)) {
      const res = await fetch(node.src)
      const blob = await res.blob()
      const file = new File([blob], node.title, {
        type: getFileType(node.src),
      })
      node.src = await uploadFile(file)
      return
    }
  }
}

const headlessEditor = createHeadlessEditor({
  namespace: 'convertor',
  nodes: [ImageNode],
  onError: (error) => {
    throw error
  },
})

const generateHtmlFromState = async (
  serializedState: SerializedEditorState
) => {
  await processNodes(serializedState.root)

  headlessEditor.update(() => {
    const editorState = headlessEditor.parseEditorState(serializedState)
    headlessEditor.setEditorState(editorState)
  })

  let html = ''

  headlessEditor.update(() => {
    html = $generateHtmlFromNodes(headlessEditor, null)
  })

  return html
}

export default generateHtmlFromState
