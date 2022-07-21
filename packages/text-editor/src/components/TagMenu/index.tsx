import { $createHeadingNode } from '@lexical/rich-text'
import { $wrapLeafNodesInElements } from '@lexical/selection'
import type { ElementNode, LexicalEditor } from 'lexical'
import { $createParagraphNode } from 'lexical'
import getSelection from '../../helpers/getSelection'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TagMenuProps {
  disabled?: boolean
  value?: string
  editor: LexicalEditor
}

const TagMenu: React.FC<TagMenuProps> = ({ disabled, value, editor }) => {
  const tag = value ?? 'p'

  const formatTag = (callback: () => ElementNode) => {
    getSelection(editor, (selection) => {
      $wrapLeafNodesInElements(selection, callback)
    })
  }

  const menuItems = [
    {
      key: 'p',
      children: '正文',
      onClick: () => formatTag($createParagraphNode),
    },
    {
      key: 'h1',
      children: '标题1',
      style: { fontSize: '16pt', fontWeight: 'bold' },
      onClick: () => formatTag(() => $createHeadingNode('h1')),
    },
    {
      key: 'h2',
      children: '标题2',
      style: { fontSize: '14pt', fontWeight: 'bold' },
      onClick: () => formatTag(() => $createHeadingNode('h2')),
    },
    {
      key: 'h3',
      children: '标题3',
      style: { fontSize: '13pt', fontWeight: 'bold' },
      onClick: () => formatTag(() => $createHeadingNode('h3')),
    },
  ]

  const activeMenuItem =
    menuItems.find((item) => item.key === tag) ?? menuItems[0]

  return (
    <Menu selectedKey={tag} menuItems={menuItems}>
      <LabelButton label="标题" disabled={disabled}>
        {activeMenuItem.children}
      </LabelButton>
    </Menu>
  )
}

export default TagMenu
