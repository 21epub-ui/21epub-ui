export type HTMLMediaElement =
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLAudioElement

export type MediaType = 'image' | 'audio' | 'video' | string

export interface MediaProps extends React.HTMLAttributes<HTMLMediaElement> {
  src?: string
  type?: MediaType
  style?: React.CSSProperties
  controls?: boolean
  controlsList?: string
  disablePictureInPicture?: boolean
}
