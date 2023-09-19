import { RadarChart } from '@21epub-ui/charts'
import type { Meta, StoryObj } from '@storybook/react'
import { letterFrequency } from '@visx/mock-data'
import { Line, LineRadial } from '@visx/shape'

export const Radar: StoryObj<typeof RadarChart> = {
  args: {
    data: [letterFrequency.slice(0, 6).map((letter) => letter.frequency)],
    width: 500,
    height: 500,
    renderGridLine: (props) => (
      <LineRadial
        {...props}
        stroke="#d9d9d9"
        strokeWidth={1}
        strokeOpacity={0.8}
        strokeLinecap="round"
      />
    ),
    renderAngleLine: (props) => (
      <Line {...props} stroke="#d9d9d9" strokeWidth={1} />
    ),
    renderDataArea: (props) => (
      <polygon
        {...props}
        fill="#3399ff"
        fillOpacity={0.3}
        stroke="#3399ff"
        strokeWidth={2}
      />
    ),
    renderDataMarker: ({ key, x, y }) => (
      <circle key={key} cx={x} cy={y} r={4} fill="#3399ff" />
    ),
  },
}

const meta: Meta<typeof RadarChart> = {
  title: 'Charts',
  component: RadarChart,
}

export default meta
