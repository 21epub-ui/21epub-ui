import type { MousePosition, OriginPosition } from '../index.types'
import radianToDegree from './radianToDegree'

const getVertexAngle = ({
  clientX,
  clientY,
  originX,
  originY,
}: MousePosition & OriginPosition) => {
  return radianToDegree(Math.atan2(clientY - originY, clientX - originX))
}

export default getVertexAngle
