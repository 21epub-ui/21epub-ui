import styled from '@emotion/styled'
import { Space } from 'antd'
import { RgbaColorPicker } from 'react-colorful'
import backslash from '../../assets/backslash.svg'
import { ColorRect } from '../ColorPicker/styles'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 30;
  background-color: white;
  padding: 10px 10px 4px 10px;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px;
  cursor: default;

  .sketch-picker > *:nth-of-type(3) {
    display: none !important;
  }
`

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

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
`

export const SwatchesSet = styled(Space)`
  width: min-content;

  > *:last-child {
    align-self: center;
    margin-top: auto;
  }
`

export const Painter = styled(Space)`
  width: 220px;
  padding: 0 10px;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: auto;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }
`

export const ColorHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`

export const ClearButton = styled(ColorRect)`
  margin-bottom: 22px;
  border: 1px solid #d9d9d9;
  align-self: center;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-image: url(${backslash});
`
