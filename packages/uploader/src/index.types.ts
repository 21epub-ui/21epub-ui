import type { ModalProps } from 'antd'

export type UploadStatus = 'error' | 'done' | 'uploading'

export interface UploadState {
  uid: string
  name: string
  size: number
  type: string
  file: File
  lastModified: number
  status?: UploadStatus
  percent?: number
  response?: any
}

export type UploadData = Record<
  string,
  string | number | boolean | Blob | undefined
>

export interface UploaderProps
  extends Omit<
    ModalProps,
    | 'confirmLoading'
    | 'onOk'
    | 'onCancel'
    | 'footer'
    | 'okText'
    | 'okType'
    | 'cancelText'
    | 'okButtonProps'
  > {
  uploadUrl: string
  accept?: string[]
  concurrent?: number
  uploadData?:
    | UploadData
    | ((uploadState: UploadState) => UploadData | Promise<UploadData>)
  onVisibleChange?: (visible: boolean) => void
  onReceive?: (
    uploadState: UploadState
  ) => void | File[] | Promise<void | File[]>
  onUploaded?: (uploadState: UploadState) => void
}
