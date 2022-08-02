import type { ElementFormatType } from 'lexical'
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
} from 'react-icons/tb'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TextAlignMenuProps {
  disabled?: boolean
  value: string
  onSelect: (value: ElementFormatType) => void
}

const TextAlignMenu: React.FC<TextAlignMenuProps> = ({
  disabled,
  value,
  onSelect,
}) => {
  const textAlign = value || 'left'

  const menuItems = [
    {
      key: 'left',
      label: '左对齐',
      icon: <TbAlignLeft />,
      onClick: () => onSelect('left'),
    },

    {
      key: 'center',
      label: '居中对齐',
      icon: <TbAlignCenter />,
      onClick: () => onSelect('center'),
    },
    {
      key: 'right',
      label: '右对齐',
      icon: <TbAlignRight />,
      onClick: () => onSelect('right'),
    },
    {
      key: 'justify',
      label: '两端对齐',
      icon: <TbAlignJustified />,
      onClick: () => onSelect('justify'),
    },
  ]

  const activeMenuItem =
    menuItems.find((item) => item.key === textAlign) ?? menuItems[0]

  return (
    <Menu disabled={disabled} selectedKey={textAlign} menuItems={menuItems}>
      <LabelButton label="对齐" icon={activeMenuItem.icon} />
    </Menu>
  )
}

export default TextAlignMenu
