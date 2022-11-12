import { useCallback, useRef } from 'react'
import createOverlay from '../helpers/createOverlay'

const useCursor = () => {
  /**
   * Chrome will recalculate style when the cursor is changed,
   * so using document.body as the target will cause performance problems.
   * @see https://bugs.chromium.org/p/chromium/issues/detail?id=664066
   */
  const overlayRef = useRef<HTMLElement | null>(null)
  const userSelectRef = useRef<[string, string] | null>(null)

  const setCursor = useCallback((cursor: string) => {
    const bodyStyle = document.body.style

    if (userSelectRef.current === null) {
      userSelectRef.current = [
        bodyStyle.getPropertyValue('user-select'),
        bodyStyle.getPropertyPriority('user-select'),
      ]
    }

    if (overlayRef.current === null) {
      const overlay = createOverlay()

      document.body.appendChild(overlay)

      overlayRef.current = overlay
    }

    bodyStyle.setProperty('user-select', 'none', 'important')
    overlayRef.current.style.setProperty('cursor', cursor)
  }, [])

  const resetCursor = useCallback(() => {
    const userSelect = userSelectRef.current
    const overlay = overlayRef.current

    if (userSelect === null || overlay === null) return

    const bodyStyle = document.body.style

    bodyStyle.setProperty('user-select', ...userSelect)
    overlay.remove()

    userSelectRef.current = null
    overlayRef.current = null
  }, [])

  return { setCursor, resetCursor }
}

export default useCursor
