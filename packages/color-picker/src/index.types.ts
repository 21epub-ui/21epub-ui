type ComponentTypes = 'label' | 'indicator' | 'picker'

export interface ColorPickerProps {
  className?: string
  label?: string
  disabled?: boolean
  style?: React.CSSProperties
  /**
   * 子组件样式
   */
  styles?: Record<ComponentTypes, React.CSSProperties>
  /**
   * 颜色值
   */
  color?: string
  /**
   * 色板配置
   */
  palettes?: string[][]
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
   * 颜色值修改完成时回调
   */
  onChangeComplete?: (color: string) => void
  /**
   * 自定义颜色指示器 render 函数
   */
  renderIndicator?: (props: {
    ref: React.RefObject<any>
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  }) => React.ReactNode
}

export interface Position {
  x: number
  y: number
}
