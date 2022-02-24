import styled from 'styled-components'

interface ColorRectProps {
  color: string
}

export const ColorRect = styled.div<ColorRectProps>`
  width: 16px;
  height: 16px;
  background: ${({ color }) => color};
  cursor: pointer;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
`
