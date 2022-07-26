import type { SerializedElementNode } from 'lexical'
import isImageNode from './isImageNode'
import isParagraphNode from './isParagraphNode'

const hasImageNode = (elementNode: SerializedElementNode): boolean => {
  for (let i = 0; i < elementNode.children.length; ++i) {
    const node = elementNode.children[i]
    if (isImageNode(node)) return true
    if (isParagraphNode(node)) return hasImageNode(node)
  }

  return false
}

export default hasImageNode
