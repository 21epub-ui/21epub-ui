import type { Rect } from '../index.types'

const getOriginPosition = (rect: Rect) => {
  const { width, height, left, top } = rect
  const originX = left + width / 2
  const originY = top + height / 2

  return { originX, originY }
}

export default getOriginPosition
