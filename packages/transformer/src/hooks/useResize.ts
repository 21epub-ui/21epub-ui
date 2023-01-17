import { useCallback, useRef, useState } from 'react'
import resizeRect from '../helpers/resizeRect'
import type { Rect, ResizeEvents } from '../index.types'
import degreeToRadian from '../utils/degreeToRadian'

export interface Positioning {
  startX: number
  startY: number
  startRect: Rect
  direction: number
}

interface Context extends Rect, Omit<ResizeEvents, 'onResizeStart'> {
  rotation: number
  zoom: number
  isProportional?: boolean
}

const useResize = (context: Context) => {
  const [isResizing, setIsResizing] = useState(false)

  const contextRef = useRef(context)

  contextRef.current = context

  const resize = (event: PointerEvent, positioning: Positioning) => {
    const { clientX, clientY } = event
    const { startX, startY, startRect, direction } = positioning
    const {
      left,
      top,
      width,
      height,
      rotation,
      zoom,
      isProportional,
      onResize,
    } = contextRef.current
    const deltaX = clientX - startX
    const deltaY = clientY - startY
    const diagonal = Math.sqrt(deltaX ** 2 + deltaY ** 2)
    const angle = Math.atan2(deltaY, deltaX) - degreeToRadian(rotation)
    const deltaSize = {
      width: (diagonal * Math.cos(angle)) / zoom,
      height: (diagonal * Math.sin(angle)) / zoom,
    }
    const newRect = resizeRect(
      startRect,
      deltaSize,
      rotation,
      direction,
      isProportional
    )

    onResize?.({
      ...newRect,
      clientX,
      clientY,
      deltaLeft: newRect.left - left,
      deltaTop: newRect.top - top,
      deltaWidth: newRect.width - width,
      deltaHeight: newRect.height - height,
    })
  }

  const startResize = useCallback(
    (positioning: Omit<Positioning, 'startRect'>) => {
      setIsResizing(true)

      const { left, top, width, height } = contextRef.current
      const startRect = { left, top, width, height }
      const newPositioning = { ...positioning, startRect }

      const onPointerMove = (event: PointerEvent) => {
        resize(event, newPositioning)
      }

      const onPointerUp = (event: PointerEvent) => {
        const { clientX, clientY } = event

        setIsResizing(false)

        contextRef.current.onResizeEnd?.({ clientX, clientY })

        document.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('pointerup', onPointerUp)
      }

      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    },
    []
  )

  return { isResizing, startResize }
}

export default useResize
