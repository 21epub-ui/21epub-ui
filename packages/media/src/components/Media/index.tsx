import { useState } from 'react'
import type { MediaProps } from '../../index.types'
import fallback from '../../assets/fallback.png'
import { Container, StyledAudio, StyledImage, StyledVideo } from './styles'

const StyledMedia: React.FC<MediaProps> = ({
  type = 'image',
  controls,
  controlsList,
  disablePictureInPicture,
  ...mediaProps
}) => {
  switch (type) {
    case 'image':
      return <StyledImage {...mediaProps} />
    case 'video':
      return (
        <StyledVideo
          controls={controls}
          controlsList={controlsList}
          disablePictureInPicture={disablePictureInPicture}
          {...mediaProps}
        />
      )
    case 'audio':
      return (
        <StyledAudio
          controls={controls}
          controlsList={controlsList}
          {...mediaProps}
        />
      )
    default:
      return <StyledImage {...mediaProps} />
  }
}

/**
 * 使媒体标签在容器内居中并等比缩放
 */
const Media: React.FC<MediaProps> = ({
  className,
  style,
  type,
  ...mediaProps
}) => {
  const [mediaType, setMediaType] = useState(type)

  return (
    <Container className={className} style={style}>
      <StyledMedia
        onError={(e) => {
          setMediaType('image')
          e.currentTarget.src = fallback
        }}
        {...mediaProps}
        type={mediaType}
      />
    </Container>
  )
}

export default Media
