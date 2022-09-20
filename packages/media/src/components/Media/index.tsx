import { useState } from 'react'
import type { MediaProps } from '../../index.types'
import fallback from '../../assets/fallback.png'
import { Container, Audio, Image, Video } from './styles'

const Content: React.FC<MediaProps> = ({
  type,
  controls,
  controlsList,
  disablePictureInPicture,
  ...props
}) => {
  switch (type) {
    case 'image': {
      return <Image {...props} />
    }
    case 'video': {
      return (
        <Video
          controls={controls}
          controlsList={controlsList}
          disablePictureInPicture={disablePictureInPicture}
          {...props}
        />
      )
    }
    case 'audio': {
      return (
        <Audio controls={controls} controlsList={controlsList} {...props} />
      )
    }
    default: {
      return null
    }
  }
}

/**
 * 使媒体标签在容器内居中并等比缩放
 */
const Media: React.FC<MediaProps> = ({
  className,
  style,
  type = 'image',
  ...props
}) => {
  const [mediaType, setMediaType] = useState(type)

  return (
    <Container className={className} style={style}>
      <Content
        type={mediaType}
        onError={(e) => {
          setMediaType('image')
          e.currentTarget.src = fallback
        }}
        {...props}
      />
    </Container>
  )
}

export default Media
