import { Space } from 'antd'
import type { InputProps } from 'antd/lib/input'
import { Label, StyledInput } from './styles'

interface Props extends InputProps {
  label?: string
}

const Input = ({ className, style, label, ...props }: Props) => (
  <Space
    className={className}
    style={style}
    direction="vertical"
    align="center"
    size={0}
  >
    <StyledInput size="small" {...props} />
    {label && <Label>{label}</Label>}
  </Space>
)

export default Input
