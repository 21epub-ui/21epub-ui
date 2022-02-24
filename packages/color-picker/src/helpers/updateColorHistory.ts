import { colord } from 'colord'
import getColorHistory from './getColorHistory'

const updateColorHistory = (color: string, key?: string) => {
  if (colord(color).alpha() === 0) return

  const colorHistory = new Set(getColorHistory())

  colorHistory.delete(color)

  localStorage.setItem(
    key ?? 'color-picker-history',
    JSON.stringify([color, ...Array.from(colorHistory)])
  )
}

export default updateColorHistory
