import type { Point } from '../index.types'

const getPointsString = (point: Point[]) => {
  return point.reduce((previousPoints, currentPoint, index) => {
    if (index === 0) return `${currentPoint.x},${currentPoint.y}`

    return `${previousPoints} ${currentPoint.x},${currentPoint.y}`
  }, '')
}

export default getPointsString
