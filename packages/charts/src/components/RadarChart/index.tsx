import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import getPointsString from '../../helpers/getPointersString'
import type { Point } from '../../index.types'

const fullAngle = 360

const genAngles = (length: number) => {
  const step = fullAngle / length

  return Array.from({ length: length + 1 }).map((_, index) => {
    return index * step + (length % 2 === 0 ? 0 : step / 2)
  })
}

const genVertices = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length

  return Array.from({ length }).map((_, index) => ({
    x: radius * Math.sin(index * step),
    y: radius * Math.cos(index * step),
  }))
}

const getDataPoints = (
  data: number[],
  getLength: (value: number) => number
) => {
  const step = (Math.PI * 2) / data.length

  return Array.from({ length: data.length }).map((_, index) => {
    const x = getLength(data[index]) * Math.sin((index + 1) * step)
    const y = getLength(data[index]) * Math.cos((index + 1) * step)

    return { x, y }
  })
}

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 }

export interface RadarChartProps extends React.SVGAttributes<SVGElement> {
  data: number[][]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  levels?: number
  renderGridLine?: (props: {
    key: React.Key
    data: number[]
    angle: number | ((angle: number) => number)
    radius: number | ((radius: number) => number)
  }) => React.ReactElement
  renderAngleLine?: (props: {
    key: React.Key
    from: Point
    to: Point
  }) => React.ReactElement
  renderDataArea?: (props: {
    key: React.Key
    points: string
  }) => React.ReactElement
  renderDataMarker?: (props: {
    key: React.Key
    cx: number
    cy: number
  }) => React.ReactElement
  renderBackground?: (props: {
    width: number
    height: number
  }) => React.ReactElement
}

export default function RadarChart({
  data,
  width,
  height,
  levels = 5,
  margin = defaultMargin,
  renderBackground,
  renderGridLine,
  renderAngleLine,
  renderDataArea,
  renderDataMarker,
  ...props
}: RadarChartProps) {
  const radarWidth = width - margin.left - margin.right
  const radarHeight = height - margin.top - margin.bottom
  const radius = Math.min(radarWidth, radarHeight) / 2

  const getAngle = scaleLinear({
    range: [0, Math.PI * 2],
    domain: [0, fullAngle],
  })

  const getLength = scaleLinear({
    range: [0, radius],
    domain: [0, Math.max(...data.flat())],
  })

  const length = Math.max(...data.map((item) => item.length))
  const vertices = genVertices(length, radius)
  const dataPoints = data.map((item) => getDataPoints(item, getLength))

  return (
    <svg {...props} width={width} height={height}>
      {renderBackground?.({ width, height })}
      <Group top={height / 2} left={width / 2}>
        {Array.from({ length: levels }).map((_, index) => {
          return renderGridLine?.({
            key: index,
            data: genAngles(length),
            angle: getAngle,
            radius: ((index + 1) * radius) / levels,
          })
        })}
        {vertices.map((vertex, index) => {
          return renderAngleLine?.({
            key: index,
            from: { x: 0, y: 0 },
            to: vertex,
          })
        })}
        {dataPoints.map((points, index) => {
          return renderDataArea?.({
            key: index,
            points: getPointsString(points),
          })
        })}
        {dataPoints.flat().map((point, index) => {
          return renderDataMarker?.({ key: index, cx: point.x, cy: point.y })
        })}
      </Group>
    </svg>
  )
}
