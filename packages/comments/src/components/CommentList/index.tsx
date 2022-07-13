import type { ResponseData } from '../../api/request'
import type { CommentListData, ReplyData } from '../../index.types'
import CommentItem from '../CommentItem'
import { Container } from './styles'

interface CommentListProps {
  value?: ResponseData<CommentListData>[]
  onReply: (target: ReplyData) => void
  loadMore: () => void
}

const CommentList: React.FC<CommentListProps> = ({
  value,
  onReply,
  loadMore,
}) => (
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

export default CommentList
