import { Space } from 'antd'
import styled from '@emotion/styled'
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

  .sketch-picker > *:nth-child(3) {
    display: none !important;
  }
`

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
`

interface SwatchesSetProps {
  span: number
}

export const SwatchesSet = styled(Space)<SwatchesSetProps>`
  width: ${({ span }) => span * 24 - 8}px;

  > *:last-child {
    margin-top: auto;
  }
`

export const Palette = styled(Space)`
  width: 220px;
  padding: 0 10px;

  > *:last-child {
    margin-top: auto;
  }
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
