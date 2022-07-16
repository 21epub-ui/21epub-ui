import type { SerializedLexicalNode } from 'lexical'
import type { SerializedParagraphNode } from 'lexical/nodes/LexicalParagraphNode'

const isParagraphNode = (
  node: SerializedLexicalNode
): node is SerializedParagraphNode => {
  return node.type === 'paragraph'
}

export default isParagraphNode
