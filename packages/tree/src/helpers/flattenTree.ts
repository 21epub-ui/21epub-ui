import type {
  FlatTreeNode,
  FlatTreeNodeParent,
  TreeNodeParent,
} from '../index.types'
import isParentNode from './isParentNode'

const flatten = (
  data: FlatTreeNodeParent,
  expandedIds: string[],
  depth = 1
) => {
  return data.children.flatMap((node): FlatTreeNode | FlatTreeNode[] => {
    const flatNode = { ...node, parent: data, depth }

    if (isParentNode(flatNode) && expandedIds.includes(node.id)) {
      return [flatNode, ...flatten(flatNode, expandedIds, depth + 1)]
    }

    return flatNode
  })
}

const flattenTree = (data: TreeNodeParent, expandedIds: string[]) => {
  return flatten({ ...data, depth: 0 }, expandedIds)
}

export default flattenTree
