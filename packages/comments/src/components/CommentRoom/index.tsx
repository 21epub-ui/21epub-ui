import { DragHandleIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, IconButton, Tabs } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import type { Coordinates } from '@dnd-kit/utilities'
import { $isRootTextContentEmpty } from '@lexical/text'
import type { LexicalEditor } from 'lexical'
import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { useEffect, useState } from 'react'
import createComment from '../../api/createComment'
import createReply from '../../api/createReply'
import updateComment from '../../api/updateComment'
import generateHtmlFromState from '../../helpers/generateHtmlFromState'
import hasImageNode from '../../helpers/hasImageNode'
import useComments from '../../hooks/useComments'
import type { CommentsProps, ReplyData } from '../../index.types'
import CommentList from '../CommentList'
import { CommentEditor, Container, StyledTab, StyledTabList } from './styles'

const CommentRoom: React.FC<CommentsProps & { coordinates: Coordinates }> = ({
  style,
  slug,
  target,
  isOpen,
  coordinates,
  onClose,
  ...props
}) => {
  const [visible, setVisible] = useState(isOpen)
  const [currentTab, setCurrentTab] = useState(0)
  const [replyTarget, setReplyTarget] = useState<ReplyData>()
  const [editorDisabled, setEditorDisabled] = useState(false)

  const { comments, mutate, loadPrev, loadNext } = useComments({
    slug,
    target,
    archived: currentTab === 1,
  })

  const draggable = useDraggable({ id: 'commentRoom' })
  const { listeners, setNodeRef, setActivatorNodeRef } = draggable
  const transform = draggable.transform ?? coordinates

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  if (!visible) return null

  const closeCommentRoom = () => {
    if (isOpen !== undefined) {
      onClose?.()
    } else {
      setVisible(false)
    }
  }

  const saveComment = (editor: LexicalEditor) => {
    if (editorDisabled) return

    editor.update(async () => {
      const editorState = editor.getEditorState().toJSON()

      const isEditorEmpty =
        !hasImageNode(editorState.root) &&
        $isRootTextContentEmpty(editor.isComposing(), true)

      if (isEditorEmpty) return

      setEditorDisabled(true)

      try {
        const html = await generateHtmlFromState(editorState)

        if (replyTarget === undefined) {
          await createComment({
            slug,
            target,
            content: html,
          })
        } else {
          await createReply(replyTarget.id, {
            slug,
            target,
            content: html,
            ref: replyTarget.ref,
          })
        }

        loadPrev()
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
        setEditorDisabled(false)
      } catch {
        setEditorDisabled(false)
      }
    })
  }

  return (
    <Container
      style={{
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }}
      ref={setNodeRef}
      {...props}
    >
      <Tabs
        variant="unstyled"
        overflow="hidden"
        onChange={(index) => setCurrentTab(index)}
      >
        <StyledTabList>
          <IconButton
            ref={setActivatorNodeRef}
            aria-label="拖拽"
            icon={<DragHandleIcon />}
            {...listeners}
          />
          <Center margin="0 auto">
            <StyledTab>进行中</StyledTab>
            <StyledTab>已结束</StyledTab>
          </Center>
          <Button fontWeight="normal" onClick={closeCommentRoom}>
            关闭
          </Button>
        </StyledTabList>
        <CommentList
          value={comments}
          onReply={(target) => setReplyTarget(target)}
          onArchive={async (target) => {
            await updateComment(target.id, { archived: true })

            const isReplyTarget =
              target.id === replyTarget?.id ||
              replyTarget?.children?.some((reply) => reply.id === target.id)

            if (isReplyTarget) setReplyTarget(undefined)

            const newComments = comments?.map(({ content, ...rest }) => {
              return {
                ...rest,
                content: content.filter((item) => item.id !== target.id),
              }
            })

            mutate(newComments, false)
          }}
          onTouchBottom={loadNext}
        />
      </Tabs>
      <Box
        maxHeight="50%"
        padding="12px 0"
        marginTop="auto"
        borderTop="1px solid #f0f0f0"
      >
        {replyTarget && (
          <Flex paddingBottom="8px" margin="0 8px">
            <Box>回复 {replyTarget.nickname} :</Box>
            <IconButton
              borderRadius="50"
              marginLeft="auto"
              aria-label="取消回复"
              icon={<SmallCloseIcon />}
              onClick={() => setReplyTarget(undefined)}
            />
          </Flex>
        )}
        <CommentEditor
          disabled={editorDisabled}
          namespace="comment"
          placeholder="评论"
          onSave={saveComment}
        />
      </Box>
    </Container>
  )
}

export default CommentRoom
