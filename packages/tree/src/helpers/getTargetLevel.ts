import type { FlatTreeNode } from '../index.types'
import getMinTargetLevel from './getMinTargetLevel'

const getTargetLevel = (
  node: FlatTreeNode,
  expandedIds: string[],
  level: number
): number => {
  const minLevel = getMinTargetLevel(node, expandedIds)
  const maxLevel = node.children === undefined ? node.level : node.level + 1

  return Math.min(Math.max(level, minLevel), maxLevel)
}

export default getTargetLevel
