import { InboxOutlined } from '@ant-design/icons'
import { Checkbox, message, Space, Tooltip, Upload } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import uploadFile, { uploadUrl } from '../../api/uploadFile'
import type { UploaderProps } from '../../index.types'
import Status from '../Status'
import {
  Actions,
  Card,
  Cards,
  Label,
  ModalBody,
  StyledButton,
  StyledModal,
  StyledUpload,
} from './styles'

const checkFileSize = (size: number) => size / 1024 ** 2 <= 200

const checkSuccess = (status: number) => status >= 200 && status < 300

const Uploader: React.FC<UploaderProps> = ({
  visible,
  onVisibleChange,
  accept,
  category,
  compressible,
  onReceive,
  onUploaded,
  ...props
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [compress, setCompress] = useState(compressible)

  useEffect(() => {
    setFileList([])
  }, [visible])

  const failureList = fileList.filter((item) => item.status === 'error')

  const updateFile = (file: UploadFile) => {
    setFileList((files) => {
      return files.map((item) => {
        if (item.uid === file.uid) return file

        return item
      })
    })
  }

  const uploadFiles = (files: UploadFile[]) => {
    const newFileList: UploadFile[] = files.map((item) => ({
      ...item,
      status: 'uploading',
    }))
    setFileList(newFileList)

    newFileList.forEach((file) => {
      if (file.originFileObj === undefined) return

      const onProgress = (e: ProgressEvent<EventTarget>) => {
        const percent = (e.loaded / e.total) * 100

        updateFile({
          ...file,
          percent: e.lengthComputable ? percent : undefined,
        })
      }

      const onLoadEnd = (
        e: ProgressEvent<EventTarget>,
        xhr: XMLHttpRequest
      ) => {
        const status = xhr.status

        updateFile({
          ...file,
          percent: checkSuccess(status) ? 100 : 0,
          status: checkSuccess(status) ? 'done' : 'error',
        })
        if (file.originFileObj !== undefined) onUploaded?.(file.originFileObj)
      }

      const addListeners = (xhr: XMLHttpRequest) => {
        xhr.upload.addEventListener('progress', (e) => onProgress(e))
        xhr.addEventListener('loadend', (e) => onLoadEnd(e, xhr))
      }

      uploadFile(
        {
          compress,
          id: category ?? 'all',
          file: file.originFileObj,
        },
        addListeners
      )
    })
  }

  return (
    <StyledModal
      visible={visible}
      width="fit-content"
      footer={null}
      onCancel={() => onVisibleChange?.(false)}
      {...props}
    >
      <ModalBody>
        <StyledUpload
          action={uploadUrl}
          accept={accept?.join()}
          data={{ id: category ?? 'all', compress }}
          multiple
          fileList={fileList}
          showUploadList={false}
          beforeUpload={async (file) => {
            const fileList = await onReceive?.(file)

            if (fileList !== undefined) {
              const uploadList = fileList?.map((item, index) => {
                const uid = `${Date.now()}_${index}`

                return {
                  uid,
                  originFileObj: item,
                } as UploadFile
              })

              uploadFiles(uploadList ?? [])

              return Upload.LIST_IGNORE
            }
            if (!checkFileSize(file.size)) {
              message.error(`无法上传大于200M的文件（${file.name}）`, 5)

              return Upload.LIST_IGNORE
            }
          }}
          onChange={({ file, fileList }) => {
            setFileList(fileList)

            if (file.status === 'done') onUploaded?.(file)
          }}
        >
          {fileList.length === 0 ? (
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此处</p>
              {compressible && (
                <Space
                  onClick={(e) => {
                    setCompress(!compress)
                    e.stopPropagation()
                  }}
                >
                  <Checkbox checked={compress} />
                  <Label>压缩素材</Label>
                </Space>
              )}
            </div>
          ) : (
            <Cards wrap align="start">
              {fileList.map((item) => (
                <Tooltip key={item.uid} title={item.name}>
                  <Card
                    status={item.status}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Status file={item} />
                  </Card>
                </Tooltip>
              ))}
            </Cards>
          )}
        </StyledUpload>
        <Actions>
          {failureList.length !== 0 && (
            <StyledButton
              type="primary"
              onClick={() => uploadFiles(failureList)}
            >
              失败重传
            </StyledButton>
          )}
        </Actions>
      </ModalBody>
    </StyledModal>
  )
}

export default Uploader
