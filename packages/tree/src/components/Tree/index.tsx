import { useEffect, useRef, useState } from 'react'
import flattenTree from '../../helpers/flattenTree'
import getTargetLevel from '../../helpers/getTargetLevel'
import getNodeIds from '../../helpers/getNodeIds'
import isContainParent from '../../helpers/isContainParent'
import locateNode from '../../helpers/locateNode'
import type {
  CursorLocation,
  FlatTreeNode,
  Positioning,
  TreeNodeParent,
  TreeProps,
} from '../../index.types'
import getModifierKey from '../../utils/getModifierKey'
import TreeItems from '../TreeItems'

const Tree = <T extends TreeNodeParent>({
  className,
  style,
  renderNode,
  renderCursor,
  onNodeSelect,
  onNodeToggle,
  ...props
}: TreeProps<T>) => {
  const { data, indent, rowHeight, selectedIds, expandedIds, onNodeMove } =
    props

  const currentIdRef = useRef<string>()
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const isSelectingRef = useRef(false)
  const positioningRef = useRef<Positioning | null>(null)
  const toggleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contextRef = useRef({
    data,
    indent,
    rowHeight,
    selectedIds,
    expandedIds,
    onNodeMove,
    onNodeToggle,
  })
  const flatNodesRef = useRef<FlatTreeNode[]>([])

  contextRef.current = {
    data,
    indent,
    rowHeight,
    selectedIds,
    expandedIds,
    onNodeMove,
    onNodeToggle,
  }

  flatNodesRef.current = flattenTree(
    contextRef.current.data,
    contextRef.current.expandedIds
  )

  const [hoveringId, setHoveringId] = useState<string>()
  const [cursorLocation, setCursorLocation] = useState<CursorLocation | null>(
    null
  )

  const getPointerIndex = (event: PointerEvent) => {
    if (containerRef.current === null) return 0

    const rowHeight = contextRef.current.rowHeight
    const containerRect = containerRef.current.getBoundingClientRect()
    const offsetY =
      event.clientY -
      containerRect.top +
      rowHeight / 2 +
      containerRef.current.scrollTop

    return offsetY < 0 ? 0 : Math.trunc(offsetY / rowHeight)
  }

  const getPointerLevel = (event: PointerEvent) => {
    if (positioningRef.current === null) return 0

    const movementX = event.clientX - positioningRef.current.x

    return Math.trunc(movementX / contextRef.current.indent)
  }

  const getMoveTarget = (event: PointerEvent, index: number) => {
    const { data, expandedIds } = contextRef.current

    if (index === 0) {
      return {
        level: 0,
        index: 0,
        parentId: data.id,
        childIndex: 0,
      }
    }

    const flatNodes = flatNodesRef.current
    const targetIndex = index > flatNodes.length ? flatNodes.length : index
    const nearestNode = flatNodes[targetIndex - 1]
    const level = getTargetLevel(
      nearestNode,
      expandedIds,
      nearestNode.level + getPointerLevel(event)
    )
    const { parentId, childIndex } = locateNode(nearestNode, level)

    return {
      level,
      index: targetIndex,
      parentId,
      childIndex,
    }
  }

  const clearToggleTimer = () => {
    if (toggleTimerRef.current !== null) {
      clearTimeout(toggleTimerRef.current)

      toggleTimerRef.current = null
    }
  }

  useEffect(() => {
    if (hoveringId === undefined || hoveringId === 'root') return

    const { expandedIds, onNodeToggle } = contextRef.current

    toggleTimerRef.current = setTimeout(() => {
      if (!expandedIds.includes(hoveringId)) {
        onNodeToggle?.(expandedIds.concat(hoveringId))
      }
    }, 1000)

    return () => clearToggleTimer()
  }, [hoveringId])

  useEffect(() => {
    const currentId = currentIdRef.current

    if (currentId !== undefined && !selectedIds.includes(currentId)) {
      currentIdRef.current = flatNodesRef.current
        .filter((node) => selectedIds.includes(node.id))
        .at(-1)?.id
    }
  }, [selectedIds])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const { selectedIds, rowHeight } = contextRef.current

      if (selectedIds.length === 0 || positioningRef.current === null) return

      const positioning = positioningRef.current
      const constraint = rowHeight / 4

      const moveable =
        isDraggingRef.current ||
        Math.abs(event.clientX - positioning.x) > constraint ||
        Math.abs(event.clientY - positioning.y) > constraint

      if (moveable) {
        isDraggingRef.current = true

        const rowIndex = getPointerIndex(event)
        const { level, index, parentId } = getMoveTarget(event, rowIndex)

        setHoveringId(parentId)
        setCursorLocation({ level, index })
      }
    }

    document.addEventListener('pointermove', onPointerMove)

    return () => document.removeEventListener('pointermove', onPointerMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onPointerUp = (event: PointerEvent) => {
      isSelectingRef.current = false

      if (isDraggingRef.current === false) {
        positioningRef.current = null

        return
      }

      clearToggleTimer()
      setHoveringId(undefined)
      setCursorLocation(null)

      setTimeout(() => {
        isDraggingRef.current = false
      })

      const { selectedIds, onNodeMove } = contextRef.current

      const moveNodes = (parentId: string, index: number) => {
        positioningRef.current = null

        // 确保选中元素顺序与渲染顺序一致
        const movingIds = flatNodesRef.current
          .filter((node) => {
            return (
              selectedIds.includes(node.id) && !isContainParent(node, parentId)
            )
          })
          .map((node) => node.id)

        onNodeMove?.(movingIds, parentId, index)
      }

      const rowIndex = getPointerIndex(event)

      const { parentId, childIndex } = getMoveTarget(event, rowIndex)

      moveNodes(parentId, childIndex)
    }

    document.addEventListener('pointerup', onPointerUp)

    return () => document.removeEventListener('pointerup', onPointerUp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerDown = (event: React.PointerEvent, targetId: string) => {
    positioningRef.current = {
      x: event.clientX,
      y: event.clientY,
    }

    const currentId = currentIdRef.current

    if (event[getModifierKey()]) {
      if (selectedIds.includes(targetId)) {
        onNodeSelect?.(selectedIds.filter((id) => id !== targetId))
      } else {
        currentIdRef.current = targetId

        onNodeSelect?.(selectedIds.concat(targetId))
      }

      return
    }

    if (event.shiftKey && currentId !== undefined && currentId !== targetId) {
      event.preventDefault()

      const nodeIds = getNodeIds(data)
      const currentIndex = nodeIds.findIndex((id) => id === currentId)

      if (currentIndex === -1) return

      const targetIndex = nodeIds.findIndex((id) => id === targetId)
      const isForward = targetIndex < currentIndex
      const selection = nodeIds.filter((_, index) => {
        return isForward
          ? index >= targetIndex && index <= currentIndex
          : index <= targetIndex && index >= currentIndex
      })

      onNodeSelect?.(selection)

      return
    }

    if (selectedIds.includes(targetId)) {
      isSelectingRef.current = true
    } else {
      onNodeSelect?.([targetId])
    }

    currentIdRef.current = targetId
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {cursorLocation &&
        renderCursor?.({
          top: cursorLocation.index * rowHeight,
          left: cursorLocation.level * indent,
        })}
      <TreeItems
        nodes={data.children}
        indent={indent}
        rowHeight={rowHeight}
        hoveringId={hoveringId}
        expandedIds={expandedIds}
        selectedIds={selectedIds}
        renderNode={renderNode}
        onNodeToggle={(ids) => {
          if (isDraggingRef.current) return

          onNodeToggle?.(ids)
        }}
        onPointerDown={onPointerDown}
        onPointerUp={(_, id) => {
          if (isDraggingRef.current || !isSelectingRef.current) return

          onNodeSelect?.([id])
        }}
      />
    </div>
  )
}

export default Tree
