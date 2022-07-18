import { $isListNode, ListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import type {
  ElementNode,
  LexicalEditor,
  RangeSelection,
  TextNode,
} from 'lexical'

const getRootNode = (node: TextNode | ElementNode) => {
  if (node.getKey() === 'root') return node

  return node.getTopLevelElementOrThrow()
}

const getSelectionNode = (editor: LexicalEditor, selection: RangeSelection) => {
  const anchorNode = selection.anchor.getNode()
  const node = getRootNode(anchorNode)
  const element = editor.getElementByKey(node.getKey())

  if (element === null) return null

  if ($isListNode(node)) {
    const nearestList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)

    return nearestList ?? node
  }

  return node
}

export default getSelectionNode
