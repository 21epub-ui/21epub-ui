import { colord } from 'colord'

const getColorString = (value: Parameters<typeof colord>[0]) => {
  return colord(value).toRgbString()
}

export default getColorString
