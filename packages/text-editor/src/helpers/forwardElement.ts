import type { ForwardedRef } from 'react'

const forwardElement = (
  ref: ForwardedRef<Element>,
  element: Element | null
) => {
  if (typeof ref === 'function') {
    ref(element)
  } else if (ref !== null) {
    ref.current = element
  }
}

export default forwardElement
