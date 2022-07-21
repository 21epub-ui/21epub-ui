import type { ChakraProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import type { HTMLAttributes } from 'react'
import background from '../../assets/transparent.png'

interface ColorRectProps extends ChakraProps, HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  color?: string
}

const ColorRect: React.FC<ColorRectProps> = ({ style, color, ...props }) => (
  <Box
    borderRadius="sm"
    backgroundRepeat="round"
    backgroundBlendMode="difference"
    backgroundImage={`url(${background})`}
    style={{
      backgroundColor: color,
      ...style,
    }}
    {...props}
  />
)

export default ColorRect
