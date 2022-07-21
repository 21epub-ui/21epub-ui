import type { LexicalNode } from 'lexical'

const getNodeType = (node: LexicalNode) => {
  const type = node.getType()

  if (type === 'list') return node.getListType()

  return type
}

export default getNodeType
