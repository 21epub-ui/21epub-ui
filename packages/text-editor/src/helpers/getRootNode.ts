import { $isListNode, ListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import type { LexicalEditor, RangeSelection } from 'lexical'

const getRootNode = (editor: LexicalEditor, selection: RangeSelection) => {
  const anchorNode = selection.anchor.getNode()
  const rootNode =
    anchorNode.getKey() === 'root'
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow()
  const element = editor.getElementByKey(rootNode.getKey())

  if (element === null) return null

  if ($isListNode(rootNode)) {
    const listNode = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)

    return listNode ?? rootNode
  }

  return rootNode
}

export default getRootNode
