import type { InputNumberProps } from 'antd'
import { Space } from 'antd'
import { Label } from '../Input/styles'
import { StyledInputNumber } from './styles'

interface Props extends InputNumberProps {
  label?: string
}

const NumberInput: React.FC<Props> = ({
  className,
  style,
  label,
  ...props
}) => (
  <Space
    className={className}
    style={style}
    direction="vertical"
    align="center"
    size={0}
  >
    <StyledInputNumber size="small" {...props} />
    {label && <Label>{label}</Label>}
  </Space>
)

export default NumberInput
