import styled from '@emotion/styled'
import background from '../../assets/transparent.png'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

interface ColorRectContainerProps {
  disabled?: boolean
}

export const ColorRectContainer = styled.div<ColorRectContainerProps>`
  padding: 4px;
  border: 1px solid #d4d4d4;
  width: calc(16px + (4px + 1px) * 2);
  height: calc(16px + (4px + 1px) * 2);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

interface ColorRectProps {
  width?: number
  height?: number
  color?: string
}

export const ColorRect = styled.div<ColorRectProps>`
  width: ${({ width }) => width ?? 16}px;
  height: ${({ height }) => height ?? 16}px;
  background-blend-mode: difference;
  background-color: ${({ color }) => color};
  background-image: url(${background});
`
