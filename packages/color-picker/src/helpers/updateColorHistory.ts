import type { Colord } from 'colord'
import { defaultLocalStorageKey } from '../config'
import getColorHistory from './getColorHistory'

const updateColorHistory = (
  color: Colord,
  length = Infinity,
  key = defaultLocalStorageKey
) => {
  if (color.alpha() === 0) return

  const newColor = color.toRgbString()
  const colorHistory = new Set(getColorHistory())

  colorHistory.delete(newColor)

  const newColorHistory = [newColor, ...Array.from(colorHistory)]

  localStorage.setItem(
    key,
    JSON.stringify(newColorHistory.slice(0, length < 0 ? 0 : length))
  )
}

export default updateColorHistory
