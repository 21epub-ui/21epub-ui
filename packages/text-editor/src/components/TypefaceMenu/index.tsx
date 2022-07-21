import { $patchStyleText } from '@lexical/selection'
import type { LexicalEditor } from 'lexical'
import type { editorTypefaces } from '../../config'
import getTypeface from '../../helpers/getTypeface'
import getSelection from '../../helpers/getSelection'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

interface TypefaceMenuProps {
  disabled?: boolean
  value?: string
  editor: LexicalEditor
}

const TypefaceMenu: React.FC<TypefaceMenuProps> = ({
  disabled,
  value,
  editor,
}) => {
  const typeface = getTypeface(value)

  const formatTypeface = (newTypeface: keyof typeof editorTypefaces) => {
    getSelection(editor, (selection) => {
      $patchStyleText(selection, { 'font-family': newTypeface })
    })
  }

  const menuItems = [
    {
      key: 'sansSerif',
      children: '黑体',
      onClick: () => formatTypeface('sansSerif'),
    },
    {
      key: 'serif',
      children: '宋体',
      onClick: () => formatTypeface('serif'),
    },
    {
      key: 'monospace',
      children: '等宽',
      onClick: () => formatTypeface('monospace'),
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
