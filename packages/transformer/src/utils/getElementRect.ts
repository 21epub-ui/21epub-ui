import getRect from './getRect'

const getElementRect = (element: HTMLElement | null) => {
  return element?.getBoundingClientRect() ?? getRect()
}

export default getElementRect
