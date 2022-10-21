import type { FlatTreeNode } from '../index.types'
import getMaxNodeDepth from './getMaxNodeDepth'
import getMinNodeDepth from './getMinNodeDepth'

const getNodeDepth = (
  node: FlatTreeNode,
  expandedIds: string[],
  depth: number
): number => {
  const minDepth = getMinNodeDepth(node, expandedIds)
  const maxDepth = getMaxNodeDepth(node)

  return Math.min(Math.max(depth, minDepth), maxDepth)
}

export default getNodeDepth
