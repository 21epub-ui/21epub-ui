import type { IconButtonProps } from '@chakra-ui/react'
import { IconButton, Tooltip } from '@chakra-ui/react'

interface TipButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  label: string
}

const TipButton: React.FC<TipButtonProps> = ({ label, ...props }) => (
  <Tooltip hasArrow label={label}>
    <IconButton aria-label={label} {...props} />
  </Tooltip>
)

export default TipButton
