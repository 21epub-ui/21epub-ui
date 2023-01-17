import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import getRotateCursor from '../../utils/getRotateCursor'
import type { ControlProps } from '../Control'
import Control from '../Control'
import { east, north, south, west } from '../Transformer'

const className = 'rotate-control-corner'
const controlSize = 14
const controlOffset = -11

const getCursorAngle = (direction: number) => {
  if (direction === (north | east)) return 90

  if (direction === (south | east)) return 180

  if (direction === (south | west)) return 270

  return 0
}

export interface RotateControlCornerProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  direction: number
  onAction: (event: PointerEvent, cursorAngle: number) => void
}

const RotateControlCorner: React.FC<RotateControlCornerProps> = ({
  rotation,
  direction,
  onAction,
  ...props
}) => {
  const cursorAngle = getCursorAngle(direction)

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: controlSize,
        height: controlSize,
        ...getControlOffset(direction, controlOffset),
      }}
      cursor={getRotateCursor(rotation + cursorAngle)}
      onAction={(event) => onAction(event, cursorAngle)}
      {...props}
    />
  )
}

export default RotateControlCorner
