import type { ModalProps } from 'antd'
import type { RcFile } from 'antd/lib/upload'

export type UploadParams = Record<string, string | number | Blob | undefined>

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
  onReceive?: (file: RcFile) => void | File[] | Promise<File[] | undefined>
  onUploaded?: (file: RcFile) => void
}
