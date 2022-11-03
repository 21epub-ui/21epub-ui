import type { TransformerProps } from '../../index.types'

const Transformer: React.FC<TransformerProps> = ({ ...props }) => {
  return <div {...props} />
}

export default Transformer
