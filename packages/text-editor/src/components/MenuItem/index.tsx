import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

interface MenuItemProps extends ButtonProps {
  isSelected?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ isSelected, ...props }) => (
  <Button
    height="auto"
    justifyContent="start"
    padding="8px 16px"
    fontSize="12px"
    fontWeight="normal"
    lineHeight="1"
    borderRadius="0"
    backgroundColor={isSelected ? 'gray.100' : 'white'}
    {...props}
  />
)

export default MenuItem
