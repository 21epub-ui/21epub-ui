import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { $patchStyleText } from '@lexical/selection'
import type { LexicalEditor } from 'lexical'
import { editorStyles } from '../../config'
import getMenuItemBackground from '../../helpers/getMenuItemBackground'
import updateSelectionStyle from '../../helpers/updateSelectionStyle'

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
  editor: LexicalEditor
  selectionFontSize: string
}

const FontSizeMenu: React.FC<FontSizeMenuProps> = ({
  disabled,
  editor,
  selectionFontSize,
}) => {
  const updateSelectionFontSize = (fontSize: string) => {
    updateSelectionStyle(editor, (selection) => {
      $patchStyleText(selection, { 'font-size': fontSize })
    })
  }

  const activeMenuItem = selectionFontSize || editorStyles.fontSize

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} disabled={disabled} fontWeight="normal">
        {parseInt(activeMenuItem)}
      </MenuButton>
      <MenuList borderColor="gray.200" minWidth="50px">
        {fontSizes.map((fontSize) => (
          <MenuItem
            key={fontSize}
            backgroundColor={getMenuItemBackground(activeMenuItem === fontSize)}
            onClick={() => updateSelectionFontSize(fontSize)}
          >
            {parseInt(fontSize)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default FontSizeMenu
