import createRect from './createRect'

const getElementRect = (element: HTMLElement | null) => {
  return element?.getBoundingClientRect() ?? createRect()
}

export default getElementRect
