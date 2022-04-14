import type { ModalProps } from 'antd'
import type { RcFile } from 'antd/lib/upload'

export type MediaTypes = 'image' | 'audio' | 'video' | 'archive' | string

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
  category?: string
  compressible?: boolean
  onReceive?: (file: RcFile) => void | File[] | Promise<File[]>
  onUploaded?: (file: RcFile) => void
}
