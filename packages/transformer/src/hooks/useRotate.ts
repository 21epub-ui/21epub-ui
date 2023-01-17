import { useRef, useState } from 'react'
import type { OriginPosition, RotateEvents } from '../index.types'
import clampRotation from '../utils/clampRotation'
import getVertexAngle from '../utils/getVertexAngle'

export interface Positioning extends OriginPosition {
  startX: number
  startY: number
  startAngle: number
}

interface Context extends Omit<RotateEvents, 'onRotateStart'> {
  rotation: number
}

const useRotate = (context: Context) => {
  const [isRotating, setIsRotating] = useState(false)

  const contextRef = useRef(context)

  contextRef.current = context

  const rotate = (event: PointerEvent, positioning: Positioning) => {
    const mousePosition = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    const { startAngle, originX, originY } = positioning
    const { rotation, onRotate } = contextRef.current
    const vertexAngle = getVertexAngle({
      ...mousePosition,
      originX,
      originY,
    })
    const deltaRotation = clampRotation(vertexAngle - startAngle - rotation)

    onRotate?.({
      ...mousePosition,
      deltaRotation,
      rotation: rotation + deltaRotation,
    })
  }

  const startRotate = (positioning: Omit<Positioning, 'startAngle'>) => {
    setIsRotating(true)

    const { startX, startY, originX, originY } = positioning
    const vertexAngle = getVertexAngle({
      clientX: startX,
      clientY: startY,
      originX,
      originY,
    })
    const startAngle = vertexAngle - contextRef.current.rotation
    const newPositioning = { ...positioning, startAngle }

    const onPointerMove = (event: PointerEvent) => {
      rotate(event, newPositioning)
    }

    const onPointerUp = (event: PointerEvent) => {
      const { clientX, clientY } = event

      setIsRotating(false)

      contextRef.current.onRotateEnd?.({ clientX, clientY })

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  return { isRotating, startRotate }
}

export default useRotate
