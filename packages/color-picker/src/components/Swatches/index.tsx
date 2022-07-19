import { Wrap, WrapItem } from '@chakra-ui/react'
import { ColorRect } from './styles'

export type Direction = 'horizontal' | 'vertical'

interface Props {
  colors: string[]
  onChange: (value: string) => void
}

const Swatches: React.FC<Props> = ({ colors, onChange, ...props }) => (
  <Wrap {...props}>
    {colors.map((color) => (
      <WrapItem key={color}>
        <ColorRect color={color} onClick={() => onChange(color)} />
      </WrapItem>
    ))}
  </Wrap>
)

export default Swatches
