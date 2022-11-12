import { east, north, south, west } from '../components/Transformer'

const isAscending = (direction: number) => {
  return direction === (north | east) || direction === (south | west)
}

export default isAscending
