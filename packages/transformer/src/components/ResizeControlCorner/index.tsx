import type { PointerEvent } from 'react'
import getControlOffset from '../../helpers/getControlOffset'
import isAscending from '../../helpers/isAscending'
import getResizeCursor from '../../utils/getResizeCursor'
import type { ControlProps } from '../Control'
import Control, { controlSize } from '../Control'

const className = 'resize-control-corner'

export interface ResizeControlCornerProps
  extends Omit<ControlProps, 'cursor' | 'onAction'> {
  rotation: number
  zoom: number
  direction: number
  onAction: (event: PointerEvent, cursorAngle: number) => void
}

const ResizeControlCorner: React.FC<ResizeControlCornerProps> = ({
  rotation,
  zoom,
  direction,
  onAction,
  ...props
}) => {
  const size = controlSize / zoom
  const cursorAngle = isAscending(direction) ? 45 : -45

  return (
    <Control
      className={className}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        border: `${1 / zoom}px solid #39f`,
        backgroundColor: 'white',
        ...getControlOffset(direction, -size / 2),
      }}
      cursor={getResizeCursor(rotation + cursorAngle)}
      onAction={(event) => onAction(event, cursorAngle)}
      {...props}
    />
  )
}

export default ResizeControlCorner
