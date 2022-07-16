import type { SerializedLexicalNode, SerializedTextNode } from 'lexical'

export const isTextNode = (
  node: SerializedLexicalNode
): node is SerializedTextNode => {
  return node.type === 'text'
}

export default isTextNode
