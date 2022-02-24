import { colord } from 'colord'

const getColorHistory = (length = Infinity): string[] => {
  try {
    const value = localStorage.getItem('color-picker-history')

    if (!value) return []

    const colorHistory = JSON.parse(value)

    if (!Array.isArray(colorHistory)) return []

    return colorHistory
      .filter((item) => colord(item).isValid())
      .slice(0, length < 0 ? 0 : length)
  } catch (err) {
    console.error(err)
  }
  return []
}

export default getColorHistory
