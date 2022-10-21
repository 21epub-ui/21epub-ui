import type { FlatTreeNode, FlatTreeNodeParent } from '../index.types'
import isLastChildNode from './isLastChildNode'

const getMinNodeDepth = (
  node: FlatTreeNode | FlatTreeNodeParent,
  expandedIds: string[]
): number => {
  if (node.parent === undefined) return 1

  if (expandedIds.includes(node.id)) {
    return node.depth + 1
  }

  if (isLastChildNode(node)) {
    return getMinNodeDepth(
      node.parent,
      expandedIds.filter((id) => id !== node.parent.id)
    )
  }

  return node.depth
}

export default getMinNodeDepth
