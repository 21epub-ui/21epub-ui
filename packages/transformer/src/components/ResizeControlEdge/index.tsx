import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import getResizeCursor from '../../utils/getResizeCursor'
import type { ControlProps } from '../Control'
import Control, { controlSize } from '../Control'
import { east, west } from '../Transformer'

const className = 'resize-control-edge'

export interface ResizeControlEdgeProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  zoom: number
  direction: number
  onAction: (event: PointerEvent, cursorAngle: number) => void
}

const ResizeControlEdge: React.FC<ResizeControlEdgeProps> = ({
  rotation,
  zoom,
  direction,
  onAction,
  ...props
}) => {
  const size = controlSize / zoom
  const isHorizontal = (direction & (east | west)) > 0
  const cursorAngle = isHorizontal ? 90 : 0

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: isHorizontal ? size : '100%',
        height: isHorizontal ? '100%' : size,
        ...getControlOffset(direction, -size / 2),
      }}
      cursor={getResizeCursor(rotation + cursorAngle)}
      onAction={(event) => onAction(event, cursorAngle)}
      {...props}
    />
  )
}

export default ResizeControlEdge
