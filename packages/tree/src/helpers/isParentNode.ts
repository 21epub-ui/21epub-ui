import type { TreeNodeParent, TreeNode } from '../index.types'

const isParentNode = (node: TreeNode): node is TreeNodeParent => {
  return node.children !== undefined && node.children.length !== 0
}

export default isParentNode
