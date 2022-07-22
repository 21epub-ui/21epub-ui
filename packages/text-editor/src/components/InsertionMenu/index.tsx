import { BsHr, BsImages } from 'react-icons/bs'
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
      leftIcon: <BsImages />,
      onClick: () => onSelect('insertImage'),
    },
    {
      key: 'insertHorizontalRule',
      children: '分隔线',
      leftIcon: <BsHr />,
      onClick: () => onSelect('insertHorizontalRule'),
    },
  ]

  return (
    <Menu menuItems={menuItems}>
      <LabelButton disabled={disabled} label="插入">
        插入
      </LabelButton>
    </Menu>
  )
}

export default InsertionMenu
