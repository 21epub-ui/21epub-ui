import type { TreeNode } from '../index.types'

const isContainParent = (node: TreeNode, parentId: string): boolean => {
  if (parentId === node.id) return true

  if (node.children === undefined) return false

  return node.children.some((child) => isContainParent(child, parentId))
}

export default isContainParent
