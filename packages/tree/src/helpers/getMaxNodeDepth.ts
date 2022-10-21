import type { FlatTreeNode } from '../index.types'

const getMaxNodeDepth = (node: FlatTreeNode) => {
  if (node === undefined) return 1

  if (node.children !== undefined) return node.depth + 1

  return node.depth
}

export default getMaxNodeDepth
