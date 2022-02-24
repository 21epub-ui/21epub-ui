import type { SketchPickerProps } from 'react-color'

/**
 * @param label label
 * @param style style
 * @param color 需要透明度时请传入 rgba 格式的颜色数值
 * @param palettes 色板配置
 * @param historySize 历史颜色数量
 * @param disabled 禁止修改颜色
 * @param onChange 颜色值修改时回调
 * @param onChangeComplete 颜色值修改完成时回调
 * @param renderIndicator 自定义颜色指示器 render 函数
 */
export interface ColorPickerProps
  extends Omit<SketchPickerProps, 'ref' | 'onChange' | 'onChangeComplete'> {
  label?: string
  style?: React.CSSProperties
  color?: string
  palettes?: string[][]
  historySize?: number
  disabled?: boolean
  onChange?: (color: string) => void
  onChangeComplete?: (color: string) => void
  renderIndicator?: (props: {
    ref: React.RefObject<any>
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  }) => React.ReactNode
}

export interface Position {
  x: number
  y: number
}
