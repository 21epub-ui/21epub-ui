import { Space } from 'antd'
import { ColorRect } from './styles'

export type Direction = 'horizontal' | 'vertical'

interface Props {
  wrap?: boolean
  direction?: Direction
  colors: string[]
  onChange: (value: string) => void
}

const Swatches: React.FC<Props> = ({ colors, onChange, ...props }) => {
  return (
    <Space {...props}>
      {colors.map((color) => (
        <ColorRect key={color} color={color} onClick={() => onChange(color)} />
      ))}
    </Space>
  )
}

export default Swatches
