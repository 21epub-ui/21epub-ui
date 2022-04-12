export type HTMLMediaElement =
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLAudioElement

export type MediaTypes = 'image' | 'audio' | 'video' | string

export interface MediaProps extends React.HTMLAttributes<HTMLMediaElement> {
  src?: string
  type?: MediaTypes
  style?: React.CSSProperties
  controls?: boolean
  controlsList?: string
  disablePictureInPicture?: boolean
}
