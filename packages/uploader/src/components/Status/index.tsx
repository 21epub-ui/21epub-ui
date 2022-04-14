import { Progress } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import { Media } from '@21epub-ui/media'
import { ErrorText } from './styles'

interface Props {
  file: UploadFile
}

const Status: React.FC<Props> = ({ file, ...props }) => {
  if (file.status === 'done' && file.percent === 100) {
    return <Media src={file.response?.data?.results[0].thumbnail} {...props} />
  }

  if (file.status === 'error') {
    return <ErrorText {...props}>上传失败</ErrorText>
  }

  return (
    <div {...props}>
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
