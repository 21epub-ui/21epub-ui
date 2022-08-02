import { TbPhoto, TbSeparatorHorizontal } from 'react-icons/tb'
import type { editorCommands } from '../../config'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface InsertionMenuProps {
  disabled?: boolean
  onSelect: (type: keyof typeof editorCommands) => void
}

const InsertionMenu: React.FC<InsertionMenuProps> = ({
  disabled,
  onSelect,
}) => {
  const menuItems = [
    {
      key: 'insertImage',
      children: '图片',
      leftIcon: <TbPhoto />,
      onClick: () => onSelect('insertImage'),
    },
    {
      key: 'insertHorizontalRule',
      children: '分隔线',
      leftIcon: <TbSeparatorHorizontal />,
      onClick: () => onSelect('insertHorizontalRule'),
    },
  ]

  return (
    <Menu disabled={disabled} menuItems={menuItems}>
      <LabelButton label="插入">插入</LabelButton>
    </Menu>
  )
}

export default InsertionMenu
