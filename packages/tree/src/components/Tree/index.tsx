import type { TreeProps } from '../../index.types'

const Tree: React.FC<TreeProps> = ({ ...props }) => {
  return <div {...props} />
}

export default Tree
