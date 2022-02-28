import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'

type ComponentTypes = 'label' | 'indicator' | 'picker'

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
export interface ColorPickerProps {
  className?: string
  label?: string
  style?: CSSProperties
  styles?: Record<ComponentTypes, CSSProperties>
  color?: string
  palettes?: string[][]
  historySize?: number
  disabled?: boolean
  onChange?: (color: string) => void
  onChangeComplete?: (color: string) => void
  renderIndicator?: (props: {
    ref: RefObject<any>
    onClick: (e: MouseEvent<HTMLDivElement>) => void
  }) => ReactNode
}

export interface Position {
  x: number
  y: number
}
