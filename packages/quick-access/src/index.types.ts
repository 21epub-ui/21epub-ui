export interface LinkData {
  id: string
  title: string
  url: string
}

export type LinkList = LinkData[]

export interface QuickAccessProps {
  id: string
  type: 'cbt' | 'quiz' | 'doc'
}
