import { useCallback, useEffect, useRef, useState } from 'react'
import { Handle } from './styles'

const Direction = {
  east: 1 << 0,
  south: 1 << 1,
  west: 1 << 2,
  north: 1 << 3,
} as const

const userSelectProperty = 'user-select'
const centerPosition = 'calc((100% - 10px)/2)'

interface ImageResizerProps {
  isProportional?: boolean
  imageRef: { current: HTMLImageElement | null }
  onResizeStart: () => void
  onResizeEnd: (width: number, height: number) => void
}

const ImageResizer: React.FC<ImageResizerProps> = ({
  isProportional = true,
  imageRef,
  onResizeStart,
  onResizeEnd,
}) => {
  const userSelect = useRef({
    priority: '',
    value: 'default',
  })
  const positioningRef = useRef<{
    currentHeight: number
    currentWidth: number
    direction: number
    ratio: number
    startHeight: number
    startWidth: number
    startX: number
    startY: number
  }>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    ratio: 1,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  })

  const [isResizing, setIsResizing] = useState(false)

  const setCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west
    const ns = direction === Direction.north || direction === Direction.south
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east)

    const cursorDirection = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw'

    document.body.style.setProperty(
      'cursor',
      `${cursorDirection}-resize`,
      'important'
    )
    userSelect.current.value =
      document.body.style.getPropertyValue(userSelectProperty)
    userSelect.current.priority =
      document.body.style.getPropertyPriority(userSelectProperty)
    document.body.style.setProperty(userSelectProperty, 'none', 'important')
  }

  const resetCursor = () => {
    document.body.style.setProperty('cursor', null)
    document.body.style.setProperty(
      userSelectProperty,
      userSelect.current.value,
      userSelect.current.priority
    )
  }

  const onPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: number
  ) => {
    const image = imageRef.current

    if (image === null) return

    const { width, height } = image.getBoundingClientRect()
    const positioning = positioningRef.current

    positioning.startWidth = width
    positioning.startHeight = height
    positioning.currentWidth = width
    positioning.currentHeight = height
    positioning.ratio = width / height
    positioning.startX = event.clientX
    positioning.startY = event.clientY
    positioning.direction = direction

    setIsResizing(true)
    setCursor(direction)
    onResizeStart()
  }

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const image = imageRef.current

      if (image === null) return

      const positioning = positioningRef.current
      const minWidth = positioning.ratio > 1 ? 18 * positioning.ratio : 18
      const minHeight = positioning.ratio > 1 ? 18 : 18 / positioning.ratio

      const isHorizontal =
        positioning.direction & (Direction.east | Direction.west)
      const isVertical =
        positioning.direction & (Direction.south | Direction.north)

      const calcOffset = (type: 'horizontal' | 'vertical') => {
        if (type === 'vertical') {
          const diff = Math.floor(positioning.startY - event.clientY)
          const offset = positioning.direction & Direction.south ? -diff : diff

          return offset
        }

        const diff = Math.floor(positioning.startX - event.clientX)
        const offset = positioning.direction & Direction.east ? -diff : diff

        return offset
      }

      if (isHorizontal && isVertical) {
        const offset = calcOffset('horizontal')

        positioning.currentWidth = Math.max(
          positioning.startWidth + offset,
          minWidth
        )
        positioning.currentHeight = positioning.currentWidth / positioning.ratio
      } else if (isHorizontal) {
        const offset = calcOffset('horizontal')

        const width = Math.max(positioning.startWidth + offset, minWidth)

        positioning.currentWidth = width

        if (isProportional) {
          positioning.currentHeight =
            positioning.currentWidth / positioning.ratio
        }
      } else {
        const offset = calcOffset('vertical')

        const newHeight = Math.max(positioning.startHeight + offset, minHeight)

        positioning.currentHeight = newHeight

        if (isProportional) {
          positioning.currentWidth =
            positioning.currentHeight * positioning.ratio
        }
      }

      image.style.setProperty('width', `${positioning.currentWidth}px`)
      image.style.setProperty(
        'height',
        isProportional ? 'auto' : `${positioning.currentHeight}px`
      )
    },
    [imageRef, isProportional]
  )

  const onPointerUp = useCallback(() => {
    const image = imageRef.current

    if (image === null) return

    const positioning = positioningRef.current
    const width = positioning.currentWidth
    const height = positioning.currentHeight

    positioning.startWidth = 0
    positioning.startHeight = 0
    positioning.ratio = 0
    positioning.startX = 0
    positioning.startY = 0
    positioning.currentWidth = 0
    positioning.currentHeight = 0

    setIsResizing(false)
    resetCursor()
    onResizeEnd(width, height)
  }, [imageRef, onResizeEnd])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    }

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [isResizing, onPointerMove, onPointerUp])

  return (
    <div style={{ touchAction: isResizing ? 'none' : 'inherit' }}>
      <Handle
        style={{
          top: -6,
          left: centerPosition,
          cursor: isResizing ? undefined : 'n-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.north)
        }}
      />
      <Handle
        style={{
          top: -6,
          right: -6,
          cursor: isResizing ? undefined : 'ne-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.north | Direction.east)
        }}
      />
      <Handle
        style={{
          bottom: centerPosition,
          right: -6,
          cursor: isResizing ? undefined : 'e-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.east)
        }}
      />
      <Handle
        style={{
          bottom: -6,
          right: -6,
          cursor: isResizing ? undefined : 'nwse-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.south | Direction.east)
        }}
      />
      <Handle
        style={{
          bottom: -6,
          left: centerPosition,
          cursor: isResizing ? undefined : 's-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.south)
        }}
      />
      <Handle
        style={{
          bottom: -6,
          left: -6,
          cursor: isResizing ? undefined : 'sw-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.south | Direction.west)
        }}
      />
      <Handle
        style={{
          bottom: centerPosition,
          left: -6,
          cursor: isResizing ? undefined : 'w-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.west)
        }}
      />
      <Handle
        style={{
          top: -6,
          left: -6,
          cursor: isResizing ? undefined : 'nw-resize',
        }}
        onPointerDown={(event) => {
          onPointerDown(event, Direction.north | Direction.west)
        }}
      />
    </div>
  )
}

export default ImageResizer
