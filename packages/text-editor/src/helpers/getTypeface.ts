import { editorTypefaces } from '../config'

const getTypeface = (fontFamily: string) => {
  return Object.entries(editorTypefaces).reduce((prev, [key, value]) => {
    if (fontFamily === value) return key
    return prev
  }, 'sansSerif')
}

export default getTypeface
