import isParentNode from '../../helpers/isParentNode'
import type { TreeNode, TreeProps } from '../../index.types'
import getModifierKey from '../../utils/getModifierKey'

interface TreeItemsProps<T extends TreeNode>
  extends Omit<TreeProps, 'data' | 'onNodeSelect' | 'renderCursor'> {
  depth?: number
  nodes: T[]
  hoveringId?: string
  onPointerDown: (event: React.PointerEvent, targetId: string) => void
  onPointerUp: (event: React.PointerEvent, targetId: string) => void
}

const TreeItems = <T extends TreeNode>({
  className,
  style,
  depth = 0,
  nodes,
  indent,
  rowHeight,
  hoveringId,
  expandedIds,
  selectedIds,
  renderNode,
  onNodeToggle,
  onPointerDown,
  onPointerUp,
}: TreeItemsProps<T>) => (
  <ul
    className={className}
    style={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
      ...style,
    }}
  >
    {nodes.map((node) => (
      <li key={node.id}>
        <div
          style={{ height: rowHeight }}
          onPointerDown={(event) => onPointerDown(event, node.id)}
          onPointerUp={(event) => onPointerUp(event, node.id)}
          onClick={(event) => {
            const isDisabled =
              node.children === undefined ||
              event[getModifierKey()] ||
              event.shiftKey

            if (isDisabled) return

            if (expandedIds.includes(node.id)) {
              onNodeToggle?.(expandedIds.filter((id) => id !== node.id))
            } else {
              onNodeToggle?.(expandedIds.concat(node.id))
            }
          }}
        >
          {renderNode({
            data: node,
            indent: indent * depth,
            isExpanded: expandedIds.includes(node.id),
            isSelected: selectedIds.includes(node.id),
            isHovering: hoveringId === node.id,
          })}
        </div>
        {isParentNode(node) && expandedIds.includes(node.id) && (
          <TreeItems
            depth={depth + 1}
            nodes={node.children}
            indent={indent}
            rowHeight={rowHeight}
            hoveringId={hoveringId}
            expandedIds={expandedIds}
            selectedIds={selectedIds}
            renderNode={renderNode}
            onNodeToggle={onNodeToggle}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          />
        )}
      </li>
    ))}
  </ul>
)

export default TreeItems
