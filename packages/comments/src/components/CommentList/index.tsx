import useSWRInfinite from 'swr/infinite'
import getComments from '../../api/getComments'
import type { Response } from '../../api/request'
import request from '../../api/request'
import type { CommentData, ReplyData } from '../../index.types'
import CommentItem from '../CommentItem'
import { Container } from './styles'

interface Params {
  slug: string
  target: string
  archived?: boolean
  before?: string
}

interface CommentListProps {
  value?: Response<CommentData>[]
  onReply: (target: ReplyData) => void
  loadMore: () => void
}

const CommentList: React.FC<CommentListProps> = ({
  value,
  onReply,
  loadMore,
}) => {
  // const getKey = (
  //   index: number,
  //   previousData: Response<CommentData> | null
  // ) => {
  //   if (previousData === null) return params
  //   if (previousData.last) return null

  //   const lastList = previousData.content
  //   const lastId = lastList[lastList.length - 1].id

  //   return { ...params, before: lastId }
  // }

  // const { data, mutate, size, setSize } = useSWRInfinite<Response<CommentData>>(
  //   getKey,
  //   getComments
  // )

  // const refresh = () => {
  //   mutate(async (data) => {
  //     const [firstList, ...rest] = data ?? []
  //     const firstId = firstList?.content.at(0)?.id
  //     const res = await getComments({
  //       ...params,
  //       after: firstId,
  //     })
  //     return [res, ...rest]
  //   })
  // }

  return (
    <Container
      onScroll={(event) => {
        const target = event.currentTarget
        const { scrollHeight, scrollTop, clientHeight } = target
        const space = scrollHeight - scrollTop - clientHeight

        if (space < 50) loadMore()
      }}
    >
      {value?.map(({ content: comments }) => {
        return comments.map((item) => (
          <CommentItem
            key={item.id}
            comment={item}
            onReply={(target) => {
              const replyTarget = {
                ...target,
                id: item.id,
                ref: target.id === item.id ? undefined : target.id,
              }
              onReply(replyTarget)
            }}
          />
        ))
      })}
    </Container>
  )
}

export default CommentList
