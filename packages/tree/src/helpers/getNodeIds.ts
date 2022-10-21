import type { TreeNodeParent } from '../index.types'
import isParentNode from './isParentNode'

const getNodeIds = (data: TreeNodeParent) => {
  return data.children.flatMap((node): string | string[] => {
    if (isParentNode(node)) {
      return [node.id, ...getNodeIds(node)]
    }

    return node.id
  })
}

export default getNodeIds
