import { $patchStyleText } from '@lexical/selection'
import type { LexicalEditor } from 'lexical'
import { editorStyles } from '../../config'
import getSelection from '../../helpers/getSelection'
import LabelButton from '../LabelButton'
import Menu from '../Menu'

const fontSizes = [
  '9pt',
  '10pt',
  '11pt',
  '12pt',
  '13pt',
  '14pt',
  '16pt',
  '18pt',
  '20pt',
  '22pt',
  '24pt',
  '30pt',
  '36pt',
]

interface FontSizeMenuProps {
  disabled?: boolean
  value?: string
  editor: LexicalEditor
}

const FontSizeMenu: React.FC<FontSizeMenuProps> = ({
  disabled,
  value,
  editor,
}) => {
  const fontSize = value || editorStyles.fontSize

  const formatFontSize = (newFontSize: string) => {
    getSelection(editor, (selection) => {
      $patchStyleText(selection, { 'font-size': newFontSize })
    })
  }

  const menuItems = fontSizes.map((fontSize) => {
    return {
      key: fontSize,
      isSelected: fontSize === fontSize,
      children: parseInt(fontSize),
      onClick: () => formatFontSize(fontSize),
    }
  })

  return (
    <Menu selectedKey={fontSize} menuItems={menuItems}>
      <LabelButton disabled={disabled} label="字号">
        {parseInt(fontSize)}
      </LabelButton>
    </Menu>
  )
}

export default FontSizeMenu
