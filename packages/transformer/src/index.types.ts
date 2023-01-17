import type { Direction } from './components/Transformer'

export interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export interface MousePosition {
  clientX: number
  clientY: number
}

export interface OriginPosition {
  originX: number
  originY: number
}

export interface RectEventProps extends Rect, MousePosition {
  deltaLeft: number
  deltaTop: number
  deltaWidth: number
  deltaHeight: number
}

export interface RotateEventProps extends MousePosition {
  rotation: number
  deltaRotation: number
}

export interface ResizeEvents {
  onResizeStart?: (value: MousePosition) => void
  onResize?: (value: RectEventProps) => void
  onResizeEnd?: (value: MousePosition) => void
}

export interface RotateEvents {
  onRotateStart?: (value: MousePosition) => void
  onRotate?: (value: RotateEventProps) => void
  onRotateEnd?: (value: MousePosition) => void
}

export interface TransformerProps extends Rect, ResizeEvents, RotateEvents {
  className?: string
  style?: React.CSSProperties
  rotation?: number
  directions?: Direction[]
  zoom?: number
  resizable?: boolean
  rotatable?: boolean
  isProportional?: boolean
}
