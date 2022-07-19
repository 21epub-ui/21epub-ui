import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  NumberInput,
  NumberInputField,
  Stack,
} from '@chakra-ui/react'
import { colord } from 'colord'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ThemeColors } from '../../config'
import getColorHistory from '../../helpers/getColorHistory'
import updateColorHistory from '../../helpers/updateColorHistory'
import type { ColorPickerProps } from '../../index.types'
import ColorInput from '../ColorInput'
import { ColorRect } from '../ColorPicker/styles'
import Swatches from '../Swatches'
import { ClearButton, StyledColorPicker, SwatchesSet } from './styles'

interface Props
  extends Pick<
    ColorPickerProps,
    | 'className'
    | 'style'
    | 'isOpen'
    | 'color'
    | 'historySize'
    | 'localStorageKey'
    | 'onClose'
    | 'onChange'
    | 'onRenderSwatches'
  > {
  color: string
}

const Picker: React.FC<Props> = ({
  className,
  style,
  isOpen,
  color,
  historySize,
  localStorageKey,
  onClose,
  onChange,
  onRenderSwatches,
}) => {
  const [initColor, setInitColor] = useState(color)
  const [currColor, setCurrColor] = useState(colord(color))

  const recentColorsLength = historySize ?? 2 * ThemeColors.length

  const colorHistory = getColorHistory(recentColorsLength, localStorageKey)

  useEffect(() => {
    if (isOpen) {
      setInitColor(color)
      setCurrColor(colord(color))
    } else if (initColor !== color) {
      updateColorHistory(color, recentColorsLength, localStorageKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const onColorChange = (
    value: Parameters<typeof colord>[0],
    forced?: boolean
  ) => {
    const newColor = colord(value)
    const alpha = newColor.alpha()

    if (alpha === currColor.alpha() && alpha === 0 && !forced) {
      newColor.rgba.a = 1
    }

    setCurrColor(newColor)
    onChange?.(newColor.toRgbString())
  }

  return (
    <Flex
      padding="10px"
      backgroundColor="white"
      className={className}
      style={style}
    >
      <SwatchesSet align="center">
        {onRenderSwatches?.({ onChange: onColorChange }) || (
          <HStack>
            {ThemeColors.map((item, index) => (
              <Swatches key={index} colors={item} onChange={onColorChange} />
            ))}
          </HStack>
        )}
        {!colorHistory.length || <Divider />}
        <Swatches colors={colorHistory} onChange={onColorChange} />
        <ColorInput color={currColor} onChange={onColorChange} />
      </SwatchesSet>
      <Stack width="220px" padding="0 10px">
        <StyledColorPicker color={currColor.rgba} onChange={onColorChange} />
        <HStack>
          {['r', 'g', 'b', 'a'].map((item) => {
            const isAlpha = item === 'a'

            return (
              <Stack key={item} align="center" spacing="4px" lineHeight="1">
                <NumberInput
                  min={0}
                  max={isAlpha ? 1 : 255}
                  step={isAlpha ? 0.1 : 1}
                  value={currColor.rgba[item]}
                  onChange={(value) => {
                    const newColor = {
                      ...currColor.rgba,
                      [item]: value ?? value[item],
                    }
                    onColorChange(newColor)
                  }}
                >
                  <NumberInputField padding="0 8px" borderColor="gray.200" />
                </NumberInput>
                <Box fontSize="xs">{item.toUpperCase()}</Box>
              </Stack>
            )
          })}
        </HStack>
      </Stack>
      <Flex align="center" direction="column">
        <Stack width="100%">
          <Button
            colorScheme="twitter"
            fontWeight="normal"
            borderRadius="sm"
            onClick={onClose}
          >
            确定
          </Button>
          <Button
            fontWeight="normal"
            borderRadius="sm"
            onClick={() => onColorChange(initColor, true)}
          >
            复位
          </Button>
        </Stack>
        <Stack align="center" margin="auto 0" fontSize="xs" spacing="4px">
          <div>新的</div>
          <ColorRect width={48} height={32} color={currColor.toRgbString()} />
          <ColorRect width={48} height={32} color={initColor} />
          <div>之前</div>
        </Stack>
        <ClearButton
          onClick={() => onColorChange({ r: 0, g: 0, b: 0, a: 0 }, true)}
        />
      </Flex>
    </Flex>
  )
}

export default Picker
