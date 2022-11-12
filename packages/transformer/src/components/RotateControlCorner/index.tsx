import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import getRotateCursor from '../../utils/getRotateCursor'
import type { ControlProps } from '../Control'
import Control from '../Control'
import { east, north, south, west } from '../Transformer'

const className = 'rotate-control-corner'
const controlSize = 14
const controlOffset = -11

const getCursor = (direction: number, rotation: number) => {
  if (direction === (north | east)) return getRotateCursor(rotation + 90)

  if (direction === (south | east)) return getRotateCursor(rotation + 180)

  if (direction === (south | west)) return getRotateCursor(rotation + 270)

  return getRotateCursor(rotation)
}

export interface RotateControlCornerProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  direction: number
  onRotate: (event: PointerEvent, cursor: string) => void
}

const RotateControlCorner: React.FC<RotateControlCornerProps> = ({
  rotation,
  direction,
  onRotate,
  ...props
}) => {
  const cursor = getCursor(direction, rotation)

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: controlSize,
        height: controlSize,
        ...getControlOffset(direction, controlOffset),
      }}
      cursor={cursor}
      onAction={(event: PointerEvent) => {
        onRotate(event, cursor)
      }}
      {...props}
    />
  )
}

export default RotateControlCorner
