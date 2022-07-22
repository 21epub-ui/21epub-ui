import type { editorTypefaces } from '../../config'
import getTypeface from '../../helpers/getTypeface'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TypefaceMenuProps {
  disabled?: boolean
  value?: string
  onSelect: (value: keyof typeof editorTypefaces) => void
}

const TypefaceMenu: React.FC<TypefaceMenuProps> = ({
  disabled,
  value,
  onSelect,
}) => {
  const typeface = getTypeface(value)

  const menuItems = [
    {
      key: 'sansSerif',
      children: '黑体',
      onClick: () => onSelect('sansSerif'),
    },
    {
      key: 'serif',
      children: '宋体',
      onClick: () => onSelect('serif'),
    },
    {
      key: 'monospace',
      children: '等宽',
      onClick: () => onSelect('monospace'),
    },
  ]

  const activeMenuItem =
    menuItems.find((item) => item.key === typeface) ?? menuItems[0]

  return (
    <Menu selectedKey={typeface} menuItems={menuItems}>
      <LabelButton label="字体" disabled={disabled}>
        {activeMenuItem.children}
      </LabelButton>
    </Menu>
  )
}

export default TypefaceMenu
