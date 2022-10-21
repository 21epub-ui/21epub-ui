const getModifierKey = () => {
  if (navigator.userAgent.includes('Macintosh')) return 'metaKey'

  return 'ctrlKey'
}

export default getModifierKey
