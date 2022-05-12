import { InboxOutlined } from '@ant-design/icons'
import { message, Tooltip, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { useEffect, useState } from 'react'
import uploadFile, { uploadUrl } from '../../api/uploadFile'
import type { UploaderProps } from '../../index.types'
import Status from '../Status'
import {
  Actions,
  Card,
  Cards,
  DropZone,
  ModalBody,
  StyledButton,
  StyledModal,
} from './styles'

const checkFileSize = (size: number) => size / 1024 ** 2 <= 200

const checkSuccess = (status: number) => status >= 200 && status < 300

const Uploader: React.FC<UploaderProps> = ({
  visible,
  onVisibleChange,
  accept,
  data,
  onReceive,
  onUploaded,
  children,
  ...props
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    setFileList([])
  }, [visible])

  const failureList = fileList.filter((item) => item.status === 'error')

  const updateFile = (patch: Partial<UploadFile>) => {
    setFileList((files) => {
      return files.map((item) => {
        if (item.uid === patch.uid) return { ...item, ...patch }

        return item
      })
    })
  }

  const uploadFiles = (files: UploadFile[]) => {
    const uploadList: UploadFile[] = files.map((item) => ({
      ...item,
      status: 'uploading',
    }))
    setFileList((fileList) => fileList.concat(uploadList))

    const requestList = uploadList.map(async (file) => {
      if (file.originFileObj === undefined) return

      const { uid } = file

      const onProgress = (e: ProgressEvent<EventTarget>) => {
        const percent = (e.loaded / e.total) * 100

        updateFile({
          uid,
          percent: e.lengthComputable ? percent : undefined,
        })
      }

      const onLoadEnd = (
        e: ProgressEvent<EventTarget>,
        xhr: XMLHttpRequest
      ) => {
        const status = xhr.status

        const result: UploadFile = {
          ...file,
          status: checkSuccess(status) ? 'done' : 'error',
          percent: checkSuccess(status) ? 100 : 0,
          response: JSON.parse(xhr.response),
        }

        updateFile(result)
        onUploaded?.(result)
      }

      const addListeners = (xhr: XMLHttpRequest) => {
        xhr.upload.addEventListener('progress', (e) => onProgress(e))
        xhr.addEventListener('loadend', (e) => onLoadEnd(e, xhr))
      }

      const params =
        typeof data === 'function' ? await data(file.originFileObj) : data

      uploadFile({ ...params, file: file.originFileObj }, addListeners)
    })

    Promise.all(requestList)
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
        <DropZone
          action={uploadUrl}
          accept={accept?.join()}
          data={data as UploadProps['data']}
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
                  name: item.name,
                  size: item.size,
                  type: item.type,
                  lastModified: item.lastModified,
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
            children || (
              <div>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此处</p>
              </div>
            )
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
        </DropZone>
        <Actions>
          {failureList.length !== 0 && (
            <StyledButton
              type="primary"
              onClick={() => {
                setFileList([])
                uploadFiles(failureList)
              }}
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
