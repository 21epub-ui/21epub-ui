const createOverlay = () => {
  const overlay = document.createElement('div')

  overlay.style.setProperty('position', 'absolute')
  overlay.style.setProperty('left', '0px')
  overlay.style.setProperty('top', '0px')
  overlay.style.setProperty('width', '100%')
  overlay.style.setProperty('height', '100%')
  overlay.style.setProperty('z-index', '1000')

  return overlay
}

export default createOverlay
