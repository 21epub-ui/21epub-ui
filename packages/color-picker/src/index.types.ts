import type { AnyColor, Colord } from 'colord'
import type { CSSProperties, ReactNode } from 'react'

export type Color = AnyColor | Colord

export interface ColorPickerProps {
  className?: string
  style?: CSSProperties
  children: JSX.Element
  /**
   * 颜色值
   */
  defaultColor?: Color
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
  onChange?: (color: Colord) => void
  /**
   * 自定义色板 render 函数
   */
  onRenderSwatches?: (props: { onChange: (color: string) => void }) => ReactNode
}
