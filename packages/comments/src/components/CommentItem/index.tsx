import { Box, HStack } from '@chakra-ui/react'
import DOMPurify from 'dompurify'
import type { HTMLAttributes } from 'react'
import type { CommentData, ReplyData } from '../../index.types'
import Time from '../Time'
import { Actions, TextButton } from './styles'

const findTarget = (comments: ReplyData[], id: string | undefined) => {
  if (id === undefined) return

  return comments.find((item) => item.id === id)
}

export interface CommentItemProps extends HTMLAttributes<HTMLDivElement> {
  comment: ReplyData & { children?: ReplyData[] }
  target?: ReplyData
  layer?: number
  onReply: (target: this['comment']) => void
  onArchive: (target: CommentData) => void
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  target,
  layer = 0,
  onReply,
  onArchive,
  ...props
}) => (
  <div
    style={{
      marginLeft: 28 * layer,
      padding: '6px 0',
    }}
    {...props}
  >
    <div>
      <HStack>
        <Box noOfLines={1} fontWeight="bold">
          {comment.nickname}
        </Box>
        {target && <Box fontSize="small">回复 {target.nickname}</Box>}
        <Box as={Time} color="#8c8c8c" fontSize="xs" value={comment.created} />
        <Actions>
          {layer === 0 && !comment.archived && (
            <TextButton onClick={() => onArchive(comment)}>结束</TextButton>
          )}
          <TextButton
            disabled={comment.archived}
            onClick={() => onReply(comment)}
          >
            回复
            {layer === 0 && `(${comment.children?.length})`}
          </TextButton>
        </Actions>
      </HStack>
      <Box
        fontSize="small"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(comment.content),
        }}
      />
    </div>
    {comment.children?.map((comment, index, replies) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        target={findTarget(replies, comment.ref)}
        layer={layer + 1}
        onReply={onReply}
        onArchive={onArchive}
      />
    ))}
  </div>
)

export default CommentItem
