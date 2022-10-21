export interface Positioning {
  x: number
  y: number
}

export type TreeNode = {
  id: string
  children?: TreeNode[]
}

export interface TreeNodeParent {
  id: string
  children: TreeNode[]
}

export interface FlatTreeNode {
  id: string
  parent: FlatTreeNodeParent
  children?: TreeNode[]
  depth: number
}

export interface FlatTreeNodeParent {
  id: string
  parent?: FlatTreeNodeParent
  children: TreeNode[]
  depth: number
}

export interface TreeItemProps<T extends TreeNode> {
  data: T
  indent: number
  isSelected: boolean
  isExpanded: boolean
  isHovering: boolean
}

export interface CursorLocation {
  index: number
  depth: number
}

export interface CursorProps {
  top: number
  left: number
}

export interface TreeProps<T extends TreeNodeParent = TreeNodeParent> {
  className?: string
  style?: React.CSSProperties
  data: T
  selectedIds: string[]
  expandedIds: string[]
  indent: number
  rowHeight: number
  renderNode: (props: TreeItemProps<T['children'][number]>) => React.ReactNode
  renderCursor?: (props: CursorProps) => React.ReactNode
  onNodeSelect?: (selectedIds: string[]) => void
  onNodeToggle?: (expandedIds: string[]) => void
  onNodeMove?: (movingIds: string[], parentId: string, index: number) => void
}
