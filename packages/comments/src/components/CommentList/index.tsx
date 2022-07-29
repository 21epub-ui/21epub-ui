import type { ResponseData } from '../../api/request'
import type { CommentData, CommentListData, ReplyData } from '../../index.types'
import CommentItem from '../CommentItem'
import { Container } from './styles'

interface CommentListProps {
  value?: ResponseData<CommentListData>[]
  onReply: (target: ReplyData) => void
  onArchive: (target: CommentData) => void
  onTouchBottom: () => void
}

const CommentList: React.FC<CommentListProps> = ({
  value,
  onReply,
  onArchive,
  onTouchBottom,
}) => (
  <Container
    onScroll={(event) => {
      const target = event.currentTarget
      const { scrollHeight, scrollTop, clientHeight } = target
      const space = scrollHeight - scrollTop - clientHeight

      if (space < 50) onTouchBottom()
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
          onArchive={onArchive}
        />
      ))
    })}
  </Container>
)

export default CommentList
