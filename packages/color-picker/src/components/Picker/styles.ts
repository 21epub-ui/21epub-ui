import { Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { RgbaColorPicker } from 'react-colorful'

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
