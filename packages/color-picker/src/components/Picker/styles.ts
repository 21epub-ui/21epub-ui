import { Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { RgbaColorPicker } from 'react-colorful'
import backslash from '../../assets/backslash.svg'
import { ColorRect } from '../ColorPicker/styles'

export const StyledColorPicker = styled(RgbaColorPicker)`
  > * + * {
    margin-top: 4px;
  }

  .react-colorful__saturation {
    border: none;
    border-radius: 2px;
  }

  .react-colorful__hue,
  .react-colorful__alpha {
    height: 10px;
    border-radius: 2px;
  }

  .react-colorful__saturation-pointer {
    width: 8px;
    height: 8px;
  }

  .react-colorful__hue-pointer,
  .react-colorful__alpha-pointer {
    width: 4px;
    height: 8px;
    border-radius: 1px;
  }
`

export const SwatchesSet = styled(Stack)`
  > *:last-child {
    margin-top: auto;
  }
`

export const ClearButton = styled(ColorRect)`
  margin-bottom: 16px;
  border: 1px solid var(--chakra-colors-gray-200);
  border-radius: 2px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-image: url(${backslash});
`
