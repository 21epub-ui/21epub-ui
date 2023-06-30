import { useEffect, useRef, useState } from 'react'
import uploadFile from '../../api/uploadFile'
import type { UploadState, UploaderProps } from '../../index.types'
import Cards from '../Cards'
import checkStatus from './helpers/checkStatus'
import createState from './helpers/createState'
import {
  Actions,
  DropZone,
  ModalBody,
  StyledButton,
  StyledModal,
} from './styles'

const Uploader: React.FC<UploaderProps> = ({
  visible,
  uploadUrl,
  onVisibleChange,
  accept,
  uploadData,
  onReceive,
  onUploaded,
  children,
  ...props
}) => {
  const [uploadList, setUploadList] = useState<UploadState[]>([])

  const inputElementRef = useRef<HTMLInputElement>(null)
  const contextRef = useRef({
    uploadUrl,
    uploadData,
    onReceive,
    onUploaded,
  })

  contextRef.current = {
    uploadUrl,
    uploadData,
    onReceive,
    onUploaded,
  }

  useEffect(() => setUploadList([]), [visible])

  const failureList = uploadList.filter((item) => item.status === 'error')

  const updateFile = (patch: Partial<UploadState>) => {
    setUploadList((files) => {
      return files.map((item) => {
        if (item.uid === patch.uid) return { ...item, ...patch }

        return item
      })
    })
  }

  const uploadFiles = (files: UploadState[]) => {
    const { uploadUrl, uploadData, onUploaded } = contextRef.current

    const newUploadList: UploadState[] = files.map((item) => ({
      ...item,
      status: 'uploading',
    }))

    setUploadList((fileList) => fileList.concat(newUploadList))

    const requestList = newUploadList.map(async (uploadState) => {
      if (uploadState.file === undefined) return

      const { uid } = uploadState

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
        const isDone = checkStatus(xhr.status)
        const newUploadState: UploadState = {
          ...uploadState,
          status: isDone ? 'done' : 'error',
          percent: isDone ? 100 : 0,
          response: xhr.response,
        }

        updateFile(newUploadState)
        onUploaded?.(newUploadState)
      }

      const addListeners = (xhr: XMLHttpRequest) => {
        xhr.upload.addEventListener('progress', (e) => onProgress(e))
        xhr.addEventListener('loadend', (e) => onLoadEnd(e, xhr))
      }

      const data =
        typeof uploadData === 'function'
          ? await uploadData(uploadState)
          : uploadData

      uploadFile(uploadUrl, { ...data, file: uploadState.file }, addListeners)
    })

    Promise.all(requestList)
  }

  const handleReceive = async (files: File[]) => {
    const { onReceive } = contextRef.current

    for await (const [index, file] of files.entries()) {
      const uploadFile = createState(index, file)

      const fileList = await onReceive?.(uploadFile)

      if (fileList === undefined) {
        uploadFiles([uploadFile])
      } else {
        const uploadList = fileList.map((file, index) => {
          return createState(index, file)
        })

        uploadFiles(uploadList)
      }
    }
  }

  return (
    <StyledModal
      centered
      visible={visible}
      width="fit-content"
      footer={null}
      onCancel={() => onVisibleChange?.(false)}
      {...props}
    >
      <input
        multiple
        ref={inputElementRef}
        style={{ display: 'none' }}
        type="file"
        accept={accept?.join()}
        onChange={(event) => {
          const files = event.target.files

          if (files !== null) {
            handleReceive(Array.from(files))

            if (inputElementRef.current !== null) {
              inputElementRef.current.files = null
            }
          }
        }}
      />
      <ModalBody>
        <DropZone
          onClick={() => inputElementRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()

            const fileList = Array.from(event.dataTransfer.files).filter(
              (file) => {
                return accept?.some((suffix) => file.name.endsWith(suffix))
              }
            )

            handleReceive(fileList)
          }}
        >
          {uploadList.length === 0 ? (
            children
          ) : (
            <Cards uploadList={uploadList} />
          )}
        </DropZone>
        <Actions>
          {failureList.length !== 0 && (
            <StyledButton
              type="primary"
              onClick={() => {
                setUploadList([])
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
