import type { SerializedLexicalNode } from 'lexical'
import type { SerializedImageNode } from '../nodes/ImageNode'

const isImageNode = (
  node: SerializedLexicalNode
): node is SerializedImageNode => {
  return node.type === 'image'
}

export default isImageNode
