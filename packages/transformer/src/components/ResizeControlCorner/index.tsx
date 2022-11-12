import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import isAscending from '../../helpers/isAscending'
import getResizeCursor from '../../utils/getResizeCursor'
import type { ControlProps } from '../Control'
import Control from '../Control'

const className = 'resize-control-corner'
const controlSize = 7
const controlOffset = -4

export interface ResizeControlCornerProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  direction: number
  onResize: (event: PointerEvent, direction: number, cursor: string) => void
}

const ResizeControlCorner: React.FC<ResizeControlCornerProps> = ({
  rotation,
  direction,
  onResize,
  ...props
}) => {
  const cursor = isAscending(direction)
    ? getResizeCursor(rotation + 45)
    : getResizeCursor(rotation - 45)

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: controlSize,
        height: controlSize,
        outline: '1px solid #3399ff',
        backgroundColor: 'white',
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

export default ResizeControlCorner
