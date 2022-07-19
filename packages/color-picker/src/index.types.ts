type ComponentTypes = 'label' | 'indicator' | 'picker'

export interface ColorPickerProps {
  className?: string
  pickerClassName?: string
  label?: string
  disabled?: boolean
  style?: React.CSSProperties
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  /**
   * 子组件样式
   */
  styles?: Record<ComponentTypes, React.CSSProperties>
  /**
   * 颜色值
   */
  color?: string
  /**
   * 历史颜色数量
   */
  historySize?: number
  /**
   * 自定义键名
   */
  localStorageKey?: string
  /**
   * 颜色值修改时回调
   */
  onChange?: (color: string) => void
  /**
   * 自定义色板 render 函数
   */
  onRenderSwatches?: (props: {
    onChange: (color: string) => void
  }) => React.ReactNode
  /**
   * 自定义颜色指示器 render 函数
   */
  onRenderIndicator?: () => React.ReactNode
}
