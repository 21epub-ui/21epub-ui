import {
  Box,
  ChakraProvider,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react'
import { chakraTheme } from '../../config'
import type { ColorPickerProps } from '../../index.types'
import getLabel from '../../utils/getLabel'
import Picker from '../Picker'
import { ColorRect, ColorRectContainer } from './styles'

const ColorPicker: React.FC<ColorPickerProps> = ({
  children,
  className,
  pickerClassName,
  style,
  styles,
  label,
  isOpen,
  color = 'rgba(0, 0, 0, 0)',
  disabled,
  onOpen,
  onClose,
  ...props
}) => {
  const disclosure = useDisclosure({ isOpen, onOpen, onClose })

  return (
    <ChakraProvider theme={chakraTheme}>
      <Popover autoFocus={false} {...disclosure}>
        <Flex align="center" className={className} style={style}>
          {label && <Box style={styles?.label}>{getLabel(label)}</Box>}
          <PopoverTrigger>
            {children ?? (
              <ColorRectContainer style={styles?.indicator} disabled={disabled}>
                <ColorRect color={color} />
              </ColorRectContainer>
            )}
          </PopoverTrigger>
        </Flex>
        <Portal>
          <PopoverContent
            width="min-content"
            borderColor="gray.200"
            borderRadius="sm"
            backgroundColor="white"
          >
            <Picker
              className={pickerClassName}
              style={styles?.picker}
              color={color}
              {...props}
              {...disclosure}
            />
          </PopoverContent>
        </Portal>
      </Popover>
    </ChakraProvider>
  )
}

export default ColorPicker
