import type { FlatTreeNode, FlatTreeNodeParent } from '../index.types'
import isLastChildNode from './isLastChildNode'

const getMinTargetLevel = (
  node: FlatTreeNode | FlatTreeNodeParent,
  expandedIds: string[]
): number => {
  if (node.parent === undefined) return 0

  if (expandedIds.includes(node.id)) {
    return node.level + 1
  }

  if (isLastChildNode(node)) {
    return getMinTargetLevel(
      node.parent,
      expandedIds.filter((id) => id !== node.parent.id)
    )
  }

  return node.level
}

export default getMinTargetLevel
