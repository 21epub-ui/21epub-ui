import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import LabelButton from '../LabelButton'

interface MenuItemProps extends ButtonProps {
  label?: string
  icon?: ReactNode
  isSelected?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  isSelected,
  ...props
}) => {
  const styles = {
    height: 'auto',
    justifyContent: 'start',
    padding: '8px 16px',
    borderRadius: '0',
    backgroundColor: isSelected ? 'gray.100' : 'white',
  }

  if (icon === undefined) {
    return (
      <Button
        fontSize="12px"
        fontWeight="normal"
        lineHeight="1"
        {...styles}
        {...props}
      />
    )
  }

  return (
    <LabelButton
      label={label}
      icon={icon}
      placement="left"
      {...styles}
      {...props}
    />
  )
}

export default MenuItem
