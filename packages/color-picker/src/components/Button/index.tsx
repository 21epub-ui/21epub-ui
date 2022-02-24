import type { ButtonProps } from 'antd'
import type { RadioProps } from 'antd/lib/radio'
import { StyledButton } from './styles'

interface Props extends ButtonProps {
  label: React.ReactNode
}

const Button: React.FC<Props & RadioProps> = ({ label, ...props }) => (
  <StyledButton size="small" {...props}>
    {label}
  </StyledButton>
)

export default Button
