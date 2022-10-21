import type { FlatTreeNode, FlatTreeNodeParent } from '../index.types'

const isLastChildNode = (
  node: FlatTreeNode | FlatTreeNodeParent
): node is FlatTreeNode => {
  const nearestList = node.parent?.children

  if (nearestList === undefined) return true

  return nearestList[nearestList.length - 1].id === node.id
}

export default isLastChildNode
