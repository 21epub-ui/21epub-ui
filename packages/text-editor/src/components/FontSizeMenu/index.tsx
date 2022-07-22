import { editorStyles } from '../../config'
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
  value: string
  onSelect: (value: string) => void
}

const FontSizeMenu: React.FC<FontSizeMenuProps> = ({
  disabled,
  value,
  onSelect,
}) => {
  const fontSize = value || editorStyles.fontSize

  const menuItems = fontSizes.map((fontSize) => {
    return {
      key: fontSize,
      isSelected: fontSize === fontSize,
      children: parseInt(fontSize),
      onClick: () => onSelect(fontSize),
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
