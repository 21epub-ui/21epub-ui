import { Tooltip } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import Status from '../Status'
import { Card, Container } from './styles'

interface Props {
  fileList: UploadFile[]
}

const Cards: React.FC<Props> = ({ fileList }) => (
  <Container wrap align="start">
    {fileList.map((item) => (
      <Tooltip key={item.uid} title={item.name}>
        <Card status={item.status} onClick={(e) => e.stopPropagation()}>
          <Status file={item} />
        </Card>
      </Tooltip>
    ))}
  </Container>
)

export default Cards
