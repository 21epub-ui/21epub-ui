import { Tooltip } from 'antd'
import type { UploadState } from '../../index.types'
import Status from '../Status'
import { Card, Container } from './styles'

interface Props {
  uploadList: UploadState[]
}

const Cards: React.FC<Props> = ({ uploadList }) => (
  <Container wrap align="start">
    {uploadList.map((state) => (
      <Tooltip key={state.uid} title={state.name}>
        <Card status={state.status} onClick={(e) => e.stopPropagation()}>
          <Status {...state} />
        </Card>
      </Tooltip>
    ))}
  </Container>
)

export default Cards
