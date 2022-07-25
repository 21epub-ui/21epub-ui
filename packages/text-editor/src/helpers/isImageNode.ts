import type { SerializedLexicalNode } from 'lexical'
import type { SerializedImageNode } from '../nodes/ImageNode'

export const isImageNode = (
  node: SerializedLexicalNode
): node is SerializedImageNode => {
  return node.type === 'image'
}
