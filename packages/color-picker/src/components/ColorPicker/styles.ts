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
  padding: 2px;
  border: 1px solid var(--chakra-colors-gray-200);
  border-radius: 2px;
  width: 24px;
  height: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition-property: var(--chakra-transition-property-common);
  transition-duration: var(--chakra-transition-duration-normal);

  :hover {
    border-color: var(--chakra-colors-gray-300);
  }
`

interface ColorRectProps {
  width?: number
  height?: number
  color?: string
}

export const ColorRect = styled.div<ColorRectProps>`
  width: ${({ width }) => width ?? 18}px;
  height: ${({ height }) => height ?? 18}px;
  border-radius: 2px;
  background-blend-mode: difference;
  background-color: ${({ color }) => color};
  background-image: url(${background});
  background-repeat: round;
`
