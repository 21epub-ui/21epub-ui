import type {
  FlatTreeNode,
  FlatTreeNodeParent,
  TreeNodeParent,
} from '../index.types'
import isParentNode from './isParentNode'

const flatten = (
  data: FlatTreeNodeParent,
  expandedIds: string[],
  level = 0
) => {
  return data.children.flatMap((node): FlatTreeNode | FlatTreeNode[] => {
    const flatNode = { ...node, parent: data, level }

    if (isParentNode(flatNode) && expandedIds.includes(node.id)) {
      return [flatNode, ...flatten(flatNode, expandedIds, level + 1)]
    }

    return flatNode
  })
}

const flattenTree = (data: TreeNodeParent, expandedIds: string[]) => {
  return flatten({ ...data, level: -1 }, expandedIds)
}

export default flattenTree
