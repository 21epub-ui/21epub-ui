import styled from '@emotion/styled'
import background from '../../assets/transparent.png'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  background-image: url(${background});
  background-repeat: round;
`

export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const StyledVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
`

export const StyledAudio = styled.audio`
  max-width: 100%;
  max-height: 100%;
`
