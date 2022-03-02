import { colord } from 'colord'
import { defaultLocalStorageKey } from '../config'
import getColorHistory from './getColorHistory'

const updateColorHistory = (
  color: string,
  length = Infinity,
  key = defaultLocalStorageKey
) => {
  if (colord(color).alpha() === 0) return

  const colorHistory = new Set(getColorHistory())

  colorHistory.delete(color)

  const newColorHistory = [color, ...Array.from(colorHistory)]

  localStorage.setItem(
    key,
    JSON.stringify(newColorHistory.slice(0, length < 0 ? 0 : length))
  )
}

export default updateColorHistory
