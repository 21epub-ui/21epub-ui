import { useRef, useState } from 'react'
import type { OriginPosition, RotateEvents } from '../index.types'
import getRotateCursor from '../utils/getRotateCursor'
import getPointerRotation from '../utils/getPointerRotation'
import useCursor from './useCursor'
import clampRotation from '../utils/clampRotation'

export interface Positioning extends OriginPosition {
  startX: number
  startY: number
  startRotation: number
}

interface Context extends Omit<RotateEvents, 'onRotateStart'> {
  rotation: number
}

const useResize = (context: Context) => {
  const [isRotating, setIsRotating] = useState(false)

  const contextRef = useRef(context)

  contextRef.current = context

  const { setCursor, resetCursor } = useCursor()

  const rotate = (event: PointerEvent, positioning: Positioning) => {
    const mousePosition = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    const { startRotation, originX, originY } = positioning
    const { rotation, onRotate } = contextRef.current
    const pointerRotation = getPointerRotation({
      ...mousePosition,
      originX,
      originY,
    })
    const deltaRotation = clampRotation(
      pointerRotation - startRotation - rotation
    )

    setCursor(getRotateCursor(pointerRotation + 45))
    onRotate?.({
      ...mousePosition,
      deltaRotation,
      rotation: rotation + deltaRotation,
    })
  }

  const startRotate = (
    positioning: Omit<Positioning, 'startRotation'>,
    cursor: string
  ) => {
    setIsRotating(true)
    setCursor(cursor)

    const { startX, startY, originX, originY } = positioning
    const pointerRotation = getPointerRotation({
      clientX: startX,
      clientY: startY,
      originX,
      originY,
    })
    const startRotation = pointerRotation - contextRef.current.rotation
    const newPositioning = { ...positioning, startRotation }

    const onPointerMove = (event: PointerEvent) => {
      rotate(event, newPositioning)
    }

    const onPointerUp = (event: PointerEvent) => {
      const { clientX, clientY } = event

      setIsRotating(false)
      resetCursor()
      contextRef.current.onRotateEnd?.({ clientX, clientY })

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  return { isRotating, startRotate }
}

export default useResize
