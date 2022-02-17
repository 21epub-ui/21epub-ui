import type { DropDownProps } from 'antd'

export interface LinkData {
  id: string
  title: string
  url: string
}

export type LinkList = LinkData[]

export interface QuickAccessProps extends DropDownProps {
  id: string
  type: 'cbt' | 'quiz' | 'doc'
  style: React.CSSProperties
}
