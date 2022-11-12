import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import getResizeCursor from '../../utils/getResizeCursor'
import type { ControlProps } from '../Control'
import Control from '../Control'
import { east, west } from '../Transformer'

const className = 'resize-control-edge'
const controlSize = 7
const controlOffset = -4

export interface ResizeControlEdgeProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  direction: number
  onResize: (event: PointerEvent, direction: number, cursor: string) => void
}

const ResizeControlEdge: React.FC<ResizeControlEdgeProps> = ({
  rotation,
  direction,
  onResize,
  ...props
}) => {
  const isHorizontal = (direction & (east | west)) > 0
  const cursor = isHorizontal
    ? getResizeCursor(rotation + 90)
    : getResizeCursor(rotation)

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: isHorizontal ? controlSize : '100%',
        height: isHorizontal ? '100%' : controlSize,
        ...getControlOffset(direction, controlOffset),
      }}
      cursor={cursor}
      onAction={(event: PointerEvent) => {
        onResize(event, direction, cursor)
      }}
      {...props}
    />
  )
}

export default ResizeControlEdge
