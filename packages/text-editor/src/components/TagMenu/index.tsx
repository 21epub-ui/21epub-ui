import type { HeadingTagType } from '@lexical/rich-text'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TagMenuProps {
  disabled?: boolean
  value: string
  onSelect: (value: 'p' | HeadingTagType) => void
}

const TagMenu: React.FC<TagMenuProps> = ({ disabled, value, onSelect }) => {
  const tag = value ?? 'p'

  const menuItems = [
    {
      key: 'p',
      children: '正文',
      onClick: () => onSelect('p'),
    },
    {
      key: 'h1',
      children: '标题1',
      style: { fontSize: '16pt', fontWeight: 'bold' },
      onClick: () => onSelect('h1'),
    },
    {
      key: 'h2',
      children: '标题2',
      style: { fontSize: '14pt', fontWeight: 'bold' },
      onClick: () => onSelect('h2'),
    },
    {
      key: 'h3',
      children: '标题3',
      style: { fontSize: '13pt', fontWeight: 'bold' },
      onClick: () => onSelect('h3'),
    },
  ]

  const activeMenuItem =
    menuItems.find((item) => item.key === tag) ?? menuItems[0]

  return (
    <Menu disabled={disabled} selectedKey={tag} menuItems={menuItems}>
      <LabelButton label="标题">{activeMenuItem.children}</LabelButton>
    </Menu>
  )
}

export default TagMenu
