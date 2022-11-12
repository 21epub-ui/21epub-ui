import { east, north, south, west } from '../components/Transformer'
import type { Rect } from '../index.types'
import cos from '../utils/cos'
import getAspectRatio from '../utils/getAspectRatio'
import sin from '../utils/sin'
import isAscending from './isAscending'

const getLength = (length: number, delta: number) => {
  const newLength = length + delta

  if (newLength < 0) return -newLength

  return newLength
}

const resizeRect = (
  startRect: Rect,
  deltaSize: Pick<Rect, 'width' | 'height'>,
  rotation: number,
  direction: number,
  isProportional?: boolean
) => {
  const { width: startWidth, height: startHeight } = startRect
  const deltaWidth = Math.round(deltaSize.width)
  const deltaHeight = Math.round(deltaSize.height)

  const newRect = { ...startRect }
  const newDelta: Partial<typeof deltaSize> = {}

  if ((direction & north) > 0) {
    newRect.height = getLength(startHeight, -deltaHeight)
    newDelta.height = deltaHeight
  }

  if ((direction & east) > 0) {
    newRect.width = getLength(startWidth, deltaWidth)
    newDelta.width = deltaWidth
  }

  if ((direction & south) > 0) {
    newRect.height = getLength(startHeight, deltaHeight)
    newDelta.height = deltaHeight
  }

  if ((direction & west) > 0) {
    newRect.width = getLength(startWidth, -deltaWidth)
    newDelta.width = deltaWidth
  }

  if (isProportional) {
    const aspectRatio = getAspectRatio(startWidth, startHeight)
    const isEdge =
      direction === north ||
      direction === east ||
      direction === south ||
      direction === west
    const isNegative = isAscending(direction)

    if (isEdge) {
      if ((direction & (east | west)) > 0) {
        newRect.height = newRect.width / aspectRatio
        newDelta.height = 0
      } else {
        newRect.width = newRect.height * aspectRatio
        newDelta.width = 0
      }
    } else {
      if (newRect.width / newRect.height > aspectRatio) {
        newRect.height = newRect.width / aspectRatio
        newDelta.height = (isNegative ? -deltaWidth : deltaWidth) / aspectRatio
      } else {
        newRect.width = newRect.height * aspectRatio
        newDelta.width = (isNegative ? -deltaHeight : deltaHeight) * aspectRatio
      }
    }
  }

  if (newDelta.width !== undefined) {
    const deltaLeft = (newDelta.width / 2) * cos(rotation)
    const deltaTop = (newDelta.width / 2) * sin(rotation)

    newRect.left += deltaLeft - (newRect.width - startWidth) / 2
    newRect.top += deltaTop
  }

  if (newDelta.height !== undefined) {
    const deltaLeft = (newDelta.height / 2) * sin(rotation)
    const deltaTop = (newDelta.height / 2) * cos(rotation)

    newRect.left -= deltaLeft
    newRect.top += deltaTop - (newRect.height - startHeight) / 2
  }

  return newRect
}

export default resizeRect
