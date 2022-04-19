import type { ModalProps } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'

export type UploadParams = Record<
  string,
  string | number | boolean | Blob | undefined
>

export type FileData = File & { uid: string }

export type FileList = FileData[]

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
  onVisibleChange?: (visible: boolean) => void
  accept?: string[]
  data?: UploadParams | ((file: RcFile) => UploadParams | Promise<UploadParams>)
  onReceive?: (file: RcFile) => void | FileList | Promise<void | FileList>
  onUploaded?: (file: UploadFile) => void
}
