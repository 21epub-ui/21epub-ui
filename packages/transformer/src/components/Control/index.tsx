import type { CSSProperties, PointerEvent } from 'react'

export interface ControlProps {
  className?: string
  style?: CSSProperties
  disabled?: boolean
  cursor: string
  onAction: (event: PointerEvent) => void
}

const Control: React.FC<ControlProps> = ({
  className,
  style,
  disabled,
  cursor,
  onAction,
}) => (
  <div
    className={className}
    style={{
      ...style,
      cursor: disabled ? undefined : cursor,
    }}
    onPointerDown={(event) => {
      if (!disabled) onAction(event)
    }}
  />
)

export default Control
