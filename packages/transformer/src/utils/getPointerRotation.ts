import type { MousePosition, OriginPosition } from '../index.types'
import radianToDegree from './radianToDegree'

const getPointerRotation = ({
  clientX,
  clientY,
  originX,
  originY,
}: MousePosition & OriginPosition) => {
  return radianToDegree(Math.atan2(clientX - originX, originY - clientY))
}

export default getPointerRotation
