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
import type { Colord } from 'colord'
import { colord } from 'colord'
import { useEffect, useState } from 'react'
import backslash from '../../assets/backslash.svg'
import { ThemeColors } from '../../config'
import getColorHistory from '../../helpers/getColorHistory'
import updateColorHistory from '../../helpers/updateColorHistory'
import type { Color, ColorPickerProps } from '../../index.types'
import ColorInput from '../ColorInput'
import ColorRect from '../ColorRect'
import Swatches from '../Swatches'
import { StyledColorPicker, SwatchesSet } from './styles'

const colorChannels = ['r', 'g', 'b', 'a'] as const

interface PickerProps
  extends Omit<ColorPickerProps, 'defaultColor' | 'children'> {
  defaultColor: Colord
  isOpen: boolean
  onClose: () => void
}

const Picker: React.FC<PickerProps> = ({
  className,
  style,
  isOpen,
  defaultColor,
  historySize,
  localStorageKey,
  onClose,
  onChange,
  onRenderSwatches,
}) => {
  const [initColor, setInitColor] = useState(defaultColor)
  const [currColor, setCurrColor] = useState(defaultColor)

  const recentColorsLength = historySize ?? 2 * ThemeColors.length

  const colorHistory = getColorHistory(recentColorsLength, localStorageKey)

  useEffect(() => {
    const newColor = colord(defaultColor)
    if (isOpen) {
      setInitColor(newColor)
      setCurrColor(newColor)
    } else if (!newColor.isEqual(initColor)) {
      updateColorHistory(newColor, recentColorsLength, localStorageKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const onColorChange = (value: Color, forced?: boolean) => {
    const newColor = colord(value)
    const alpha = newColor.alpha()

    if (alpha === currColor.alpha() && alpha === 0 && !forced) {
      newColor.rgba.a = 1
    }

    setCurrColor(newColor)
    onChange?.(newColor)
  }

  return (
    <Flex
      className={className}
      style={style}
      width="min-content"
      padding="10px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="sm"
      backgroundColor="white"
      userSelect="none"
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
          {colorChannels.map((item) => {
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
            onClick={() => {
              setCurrColor(initColor)
              onChange?.(initColor)
            }}
          >
            复位
          </Button>
        </Stack>
        <Stack align="center" margin="auto 0" fontSize="xs" spacing="4px">
          <div>新的</div>
          <ColorRect
            width="48px"
            height="32px"
            color={currColor.toRgbString()}
          />
          <ColorRect
            width="48px"
            height="32px"
            color={initColor.toRgbString()}
          />
          <div>之前</div>
        </Stack>
        <ColorRect
          cursor="pointer"
          marginBottom="16px"
          border="1px solid"
          borderColor="gray.200"
          width="24px"
          height="24px"
          backgroundImage={`url(${backslash})`}
          onClick={() => onColorChange({ r: 0, g: 0, b: 0, a: 0 }, true)}
        />
      </Flex>
    </Flex>
  )
}

export default Picker
