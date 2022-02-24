import { colord } from 'colord'

const getRgbString = (value: Parameters<typeof colord>[0]) => {
  return colord(value).toRgbString()
}

export default getRgbString
