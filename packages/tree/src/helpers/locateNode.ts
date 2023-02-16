import type { FlatTreeNode, FlatTreeNodeParent } from '../index.types'

interface NodeLocation {
  parentId: string
  childIndex: number
}

const locateNode = (
  node: FlatTreeNode | FlatTreeNodeParent,
  level: number
): NodeLocation => {
  if (node.parent === undefined) return { parentId: node.id, childIndex: 0 }

  if (level < node.level) return locateNode(node.parent, level)

  if (level > node.level) return { parentId: node.id, childIndex: 0 }

  const childIndex =
    node.parent.children.findIndex((child) => child.id === node.id) + 1

  return { childIndex, parentId: node.parent.id }
}

export default locateNode
