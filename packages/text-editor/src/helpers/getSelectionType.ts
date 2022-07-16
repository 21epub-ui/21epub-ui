import { $isListNode, ListNode } from '@lexical/list'
import { $isHeadingNode } from '@lexical/rich-text'
import { $getNearestNodeOfType } from '@lexical/utils'
import type {
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  TextNode,
} from 'lexical'

const getRootNode = (node: TextNode | ElementNode) => {
  if (node.getKey() === 'root') return node

  return node.getTopLevelElementOrThrow()
}

const getNodeType = (node: TextNode | ElementNode) => {
  if ($isHeadingNode(node)) {
    return node.getTag()
  } else {
    return node.getType()
  }
}

const getNodeListType = (node: ListNode, parent: LexicalNode | null) => {
  if (parent !== null && $isListNode(parent)) {
    return parent.getListType()
  } else {
    return node.getListType()
  }
}

const getSelectionType = (editor: LexicalEditor, selection: RangeSelection) => {
  const anchorNode = selection.anchor.getNode()
  const node = getRootNode(anchorNode)
  const element = editor.getElementByKey(node.getKey())

  if (element === null) return ''

  if ($isListNode(node)) {
    const nearestList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)

    return getNodeListType(node, nearestList)
  }

  return getNodeType(node)
}

export default getSelectionType
