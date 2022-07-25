import { colord } from 'colord'
import { defaultLocalStorageKey } from '../config'

const getColorHistory = (
  length = Infinity,
  key = defaultLocalStorageKey
): string[] => {
  try {
    const value = localStorage.getItem(key)

    if (!value) return []

    const colorHistory = JSON.parse(value)

    if (!Array.isArray(colorHistory)) return []

    return colorHistory
      .filter((item) => colord(item).isValid())
      .slice(0, length < 0 ? 0 : length)
  } catch (error) {
    console.error(error)
  }

  return []
}

export default getColorHistory
