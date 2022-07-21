import type { InputProps } from '@chakra-ui/react'
import { Box, Input, Stack } from '@chakra-ui/react'
import type { Colord } from 'colord'
import { colord } from 'colord'
import { useEffect, useState } from 'react'
import getColorString from '../../utils/getColorString'

interface ColorInputProps
  extends Omit<InputProps, 'color' | 'value' | 'onChange'> {
  color: Colord
  onChange?: (value: ColorInputProps['color']) => void
}

const ColorInput: React.FC<ColorInputProps> = ({
  color,
  onChange,
  onBlur,
  onKeyPress,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(getColorString(color))

  useEffect(() => {
    setInputValue(getColorString(color))
  }, [color])

  const onColorChange = (value: string) => {
    const newValue =
      value[0] === '#' || value.slice(0, 3) === 'rgb' ? value : `#${value}`
    const newColor = colord(newValue)

    if (!newColor.isValid()) return

    setInputValue(newColor.toRgbString())
    onChange?.(newColor)
  }

  return (
    <Stack align="center" spacing="4px" lineHeight="1">
      <Input
        borderColor="gray.200"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.currentTarget.value)
        }}
        onBlur={(e) => {
          onColorChange(e.currentTarget.value.trim())
          onBlur?.(e)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onColorChange(e.currentTarget.value.trim())
          }
          onKeyPress?.(e)
        }}
        {...props}
      />
      <Box fontSize="xs">色值</Box>
    </Stack>
  )
}

export default ColorInput
