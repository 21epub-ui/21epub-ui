import { Media } from '@21epub-ui/media'
import { Progress } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import { ErrorText } from './styles'

interface Props {
  file: UploadFile
}

const Status: React.FC<Props> = ({ file }) => {
  if (file.status === 'done' && file.percent === 100) {
    return <Media src={file.response?.data?.results[0].thumbnail} />
  }

  if (file.status === 'error') {
    return <ErrorText>上传失败</ErrorText>
  }

  return (
    <div>
      <div>素材上传中</div>
      <Progress
        percent={file.percent}
        size="small"
        showInfo={false}
        strokeWidth={2}
      />
    </div>
  )
}

export default Status
