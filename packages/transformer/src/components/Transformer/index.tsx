import type { PointerEvent } from 'react'
import { useEffect, useRef } from 'react'
import useCursor from '../../hooks/useCursor'
import useResize from '../../hooks/useResize'
import useRotate from '../../hooks/useRotate'
import type { TransformerProps } from '../../index.types'
import getElementRect from '../../utils/getElementRect'
import getOriginPosition from '../../utils/getOriginPosition'
import getResizeCursor from '../../utils/getResizeCursor'
import getRotateCursor from '../../utils/getRotateCursor'
import ResizeControlCorner from '../ResizeControlCorner'
import ResizeControlEdge from '../ResizeControlEdge'
import RotateControlCorner from '../RotateControlCorner'

export const east = 1 << 0
export const south = 1 << 1
export const west = 1 << 2
export const north = 1 << 3

const cardinalDirections = ['n', 'e', 's', 'w'] as const
const ordinalDirections = ['nw', 'ne', 'sw', 'se'] as const
const principalDirections = [
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

export type Direction = keyof typeof compass

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
  const getCursorRef = useRef<(rotation: number) => string>()

  const { setCursor, resetCursor } = useCursor()

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

  useEffect(() => {
    if (getCursorRef.current === undefined) return

    if (isTransforming) {
      setCursor(getCursorRef.current(rotation))
    } else {
      getCursorRef.current = undefined

      resetCursor()
    }
  }, [isTransforming, resetCursor, rotation, setCursor])

  const handleResize = (
    event: PointerEvent,
    cursorAngle: number,
    direction: number
  ) => {
    const { clientX, clientY } = event

    const positioning = {
      direction,
      startX: clientX,
      startY: clientY,
    }

    getCursorRef.current = (rotation: number) => {
      return getResizeCursor(rotation + cursorAngle)
    }

    onResizeStart?.({ clientX, clientY })
    startResize(positioning)
  }

  const handleRotate = (event: PointerEvent, cursorAngle: number) => {
    const { clientX, clientY } = event
    const positioning = {
      startX: clientX,
      startY: clientY,
      ...getOriginPosition(getElementRect(indicatorRef.current)),
    }

    getCursorRef.current = (rotation: number) => {
      return getRotateCursor(rotation + cursorAngle)
    }

    onRotateStart?.({ clientX, clientY })
    startRotate(positioning)
  }

  return (
    <div
      ref={indicatorRef}
      className={className}
      style={{
        width,
        height,
        position: 'absolute',
        left: 0,
        top: 0,
        outline: `${1 / zoom}px solid #39f`,
        outlineOffset: -0.5 / zoom,
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
            zoom={zoom}
            direction={compass[direction]}
            onAction={handleRotate}
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
              zoom={zoom}
              direction={compass[direction]}
              onAction={(event, cursorAngle) => {
                handleResize(event, cursorAngle, compass[direction])
              }}
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
              zoom={zoom}
              direction={compass[direction]}
              onAction={(event, cursorAngle) => {
                handleResize(event, cursorAngle, compass[direction])
              }}
            />
          ))}
    </div>
  )
}

export default Transformer
