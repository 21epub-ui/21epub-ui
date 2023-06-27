import { Media } from '@21epub-ui/media'
import { Progress } from 'antd'
import type { UploadState } from '../../index.types'
import { ErrorText } from './styles'

const Status: React.FC<UploadState> = ({ status, percent, response }) => {
  if (status === 'done' && percent === 100) {
    return <Media src={response?.data?.results[0].thumbnail} />
  }

  if (status === 'error') {
    return <ErrorText>上传失败</ErrorText>
  }

  return (
    <div>
      <div>素材上传中</div>
      <Progress
        percent={percent}
        size="small"
        showInfo={false}
        strokeWidth={2}
      />
    </div>
  )
}

export default Status
