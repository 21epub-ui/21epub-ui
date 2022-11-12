import type { PointerEvent } from 'react'
import { useRef } from 'react'
import useResize from '../../hooks/useResize'
import useRotate from '../../hooks/useRotate'
import type { TransformerProps } from '../../index.types'
import getElementRect from '../../utils/getElementRect'
import getOriginPosition from '../../utils/getOriginPosition'
import ResizeControlCorner from '../ResizeControlCorner'
import ResizeControlEdge from '../ResizeControlEdge'
import RotateControlCorner from '../RotateControlCorner'

export const east = 1 << 0
export const south = 1 << 1
export const west = 1 << 2
export const north = 1 << 3

const cardinalDirections = ['n', 'e', 's', 'w'] as const
const ordinalDirections = ['nw', 'ne', 'sw', 'se'] as const

export const principalDirections = [
  ...cardinalDirections,
  ...ordinalDirections,
] as const

const compass = {
  n: north,
  e: east,
  s: south,
  w: west,
  nw: north | west,
  ne: north | east,
  sw: south | west,
  se: south | east,
} as const

const Transformer: React.FC<TransformerProps> = ({
  className,
  style,
  left,
  top,
  width,
  height,
  rotation = 0,
  directions = principalDirections,
  zoom = 1,
  resizable = true,
  rotatable = true,
  isProportional,
  onResizeStart,
  onResize,
  onResizeEnd,
  onRotateStart,
  onRotate,
  onRotateEnd,
}) => {
  const indicatorRef = useRef<HTMLDivElement>(null)

  const { isResizing, startResize } = useResize({
    left,
    top,
    width,
    height,
    zoom,
    rotation,
    isProportional,
    onResize,
    onResizeEnd,
  })
  const { isRotating, startRotate } = useRotate({
    rotation,
    onRotate,
    onRotateEnd,
  })

  const isTransforming = isResizing || isRotating

  const handleResize = (
    event: PointerEvent,
    direction: number,
    cursor: string
  ) => {
    const { clientX, clientY } = event

    const positioning = {
      direction,
      startX: clientX,
      startY: clientY,
    }

    onResizeStart?.({ clientX, clientY })
    startResize(positioning, cursor)
  }

  const handleRotate = (event: PointerEvent, cursor: string) => {
    const { clientX, clientY } = event
    const positioning = {
      startX: clientX,
      startY: clientY,
      ...getOriginPosition(getElementRect(indicatorRef.current)),
    }

    onRotateStart?.({ clientX, clientY })
    startRotate(positioning, cursor)
  }

  return (
    <div
      ref={indicatorRef}
      className={className}
      style={{
        width,
        height,
        position: 'absolute',
        outline: '1px solid #3399ff',
        userSelect: 'none',
        touchAction: isTransforming ? 'none' : undefined,
        transform: `translate(${left}px, ${top}px) rotate(${rotation}deg)`,
        ...style,
      }}
    >
      {rotatable &&
        ordinalDirections.map((direction) => (
          <RotateControlCorner
            key={direction}
            disabled={isTransforming}
            rotation={rotation}
            direction={compass[direction]}
            onRotate={handleRotate}
          />
        ))}
      {resizable &&
        cardinalDirections
          .filter((direction) => directions.includes(direction))
          .map((direction) => (
            <ResizeControlEdge
              key={direction}
              disabled={isTransforming}
              rotation={rotation}
              direction={compass[direction]}
              onResize={handleResize}
            />
          ))}
      {resizable &&
        ordinalDirections
          .filter((direction) => directions.includes(direction))
          .map((direction) => (
            <ResizeControlCorner
              key={direction}
              disabled={isTransforming}
              rotation={rotation}
              direction={compass[direction]}
              onResize={handleResize}
            />
          ))}
    </div>
  )
}

export default Transformer
