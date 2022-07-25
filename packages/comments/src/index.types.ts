import type { HTMLAttributes } from 'react'

export interface CommentsProps extends HTMLAttributes<HTMLDivElement> {
  slug: string
  target: string
  isOpen?: boolean
  onClose?: () => void
}

export interface CommentData {
  id: string
  slug: string
  target: string
  created: number
  userId: string
  nickname: string
  content: string
  archived: boolean
  children?: ReplyListData
}

export type CommentListData = CommentData[]

export interface ReplyData extends Omit<CommentData, 'children'> {
  ref?: string
}

export type ReplyListData = ReplyData[]
