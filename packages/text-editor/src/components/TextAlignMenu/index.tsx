import type { LexicalEditor } from 'lexical'
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
} from 'react-icons/tb'
import { editorCommands } from '../../config'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TextAlignMenuProps {
  disabled?: boolean
  value: string
  editor: LexicalEditor
}

const TextAlignMenu: React.FC<TextAlignMenuProps> = ({
  disabled,
  value,
  editor,
}) => {
  const textAlign = value || 'left'

  const formatTextAlign: <P>(payload?: P) => boolean = (payload) => {
    return editor.dispatchCommand(editorCommands.formatElement, payload)
  }

  const menuItems = [
    {
      key: 'left',
      label: '左对齐',
      icon: <TbAlignLeft />,
      onClick: () => formatTextAlign('left'),
    },

    {
      key: 'center',
      label: '居中对齐',
      icon: <TbAlignCenter />,
      onClick: () => formatTextAlign('center'),
    },
    {
      key: 'right',
      label: '右对齐',
      icon: <TbAlignRight />,
      onClick: () => formatTextAlign('right'),
    },
    {
      key: 'justify',
      label: '两端对齐',
      icon: <TbAlignJustified />,
      onClick: () => formatTextAlign('justify'),
    },
  ]

  const activeMenuItem =
    menuItems.find((item) => item.key === textAlign) ?? menuItems[0]

  return (
    <Menu selectedKey={textAlign} menuItems={menuItems}>
      <LabelButton
        disabled={disabled}
        label="对齐"
        icon={activeMenuItem.icon}
      />
    </Menu>
  )
}

export default TextAlignMenu
