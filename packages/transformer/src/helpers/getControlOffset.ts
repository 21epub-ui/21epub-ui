import { east, north, south, west } from '../components/Transformer'

interface ControlOffset {
  left?: number
  right?: number
  top?: number
  bottom?: number
}

const getControlOffset = (direction: number, offset: number) => {
  const controlOffset: ControlOffset = {}

  if ((direction & north) > 0) controlOffset.top = offset
  if ((direction & east) > 0) controlOffset.right = offset
  if ((direction & south) > 0) controlOffset.bottom = offset
  if ((direction & west) > 0) controlOffset.left = offset

  return controlOffset
}

export default getControlOffset
