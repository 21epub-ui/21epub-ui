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
  onAction: (event: PointerEvent, cursorAngle: number) => void
}

const ResizeControlCorner: React.FC<ResizeControlCornerProps> = ({
  rotation,
  direction,
  onAction,
  ...props
}) => {
  const cursorAngle = isAscending(direction) ? 45 : -45

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
      cursor={getResizeCursor(rotation + cursorAngle)}
      onAction={(event) => onAction(event, cursorAngle)}
      {...props}
    />
  )
}

export default ResizeControlCorner
