import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { $patchStyleText } from '@lexical/selection'
import type { LexicalEditor } from 'lexical'
import { editorTypefaces } from '../../config'
import getMenuItemBackground from '../../helpers/getMenuItemBackground'
import getTypeface from '../../helpers/getTypeface'
import updateSelectionStyle from '../../helpers/updateSelectionStyle'

interface FontFamilyMenuProps {
  disabled?: boolean
  editor: LexicalEditor
  selectionFontFamily: string
}

const FontFamilyMenu: React.FC<FontFamilyMenuProps> = ({
  disabled,
  editor,
  selectionFontFamily,
}) => {
  const selectionTypeface = getTypeface(selectionFontFamily)

  const updateSelectionFontFamily = (fontFamily: string) => {
    updateSelectionStyle(editor, (selection) => {
      $patchStyleText(selection, { 'font-family': fontFamily })
    })
  }

  const menuItems = {
    sansSerif: {
      text: '黑体',
      onClick: () => updateSelectionFontFamily(editorTypefaces.sansSerif),
    },
    serif: {
      text: '宋体',
      onClick: () => updateSelectionFontFamily(editorTypefaces.serif),
    },
    monospace: {
      text: '等宽',
      onClick: () => updateSelectionFontFamily(editorTypefaces.monospace),
    },
  }

  const activeMenuItem = menuItems[selectionTypeface] ?? menuItems['sansSerif']

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} disabled={disabled} fontWeight="normal">
        {activeMenuItem.text}
      </MenuButton>
      <MenuList borderColor="gray.200" minWidth="50px">
        {Object.entries(menuItems).map(([key, { text, onClick }]) => (
          <MenuItem
            key={key}
            fontFamily={editorTypefaces[key]}
            backgroundColor={getMenuItemBackground(selectionTypeface === key)}
            onClick={onClick}
          >
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default FontFamilyMenu
