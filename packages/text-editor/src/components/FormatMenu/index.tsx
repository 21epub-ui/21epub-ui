import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { $createHeadingNode } from '@lexical/rich-text'
import { $wrapLeafNodesInElements } from '@lexical/selection'
import type { ElementNode, LexicalEditor } from 'lexical'
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ParagraphIcon,
} from '../Icons'

interface FormatMenuProps {
  disabled: boolean
  editor: LexicalEditor
  selectionType: string
}

const FormatMenu: React.FC<FormatMenuProps> = ({
  disabled,
  editor,
  selectionType,
}) => {
  const updateSelection = (callback: () => ElementNode) => {
    editor.update(() => {
      const selection = $getSelection()

      if (!$isRangeSelection(selection)) return

      $wrapLeafNodesInElements(selection, callback)
    })
  }

  const menuItems = {
    paragraph: {
      icon: ParagraphIcon,
      text: '正文',
      onClick: () => updateSelection($createParagraphNode),
    },
    h1: {
      icon: Heading1Icon,
      text: '标题1',
      onClick: () => updateSelection(() => $createHeadingNode('h1')),
    },
    h2: {
      icon: Heading2Icon,
      text: '标题2',
      onClick: () => updateSelection(() => $createHeadingNode('h2')),
    },
    h3: {
      icon: Heading3Icon,
      text: '标题3',
      onClick: () => updateSelection(() => $createHeadingNode('h3')),
    },
  }

  const activeMenuItem = menuItems[selectionType]

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        disabled={disabled}
        fontWeight="normal"
        leftIcon={activeMenuItem.icon}
      >
        {activeMenuItem.text}
      </MenuButton>
      <MenuList borderColor="gray.200" minWidth="fit-content">
        {Object.entries(menuItems).map(([key, { icon, text, onClick }]) => (
          <MenuItem key={key} icon={icon} onClick={onClick}>
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default FormatMenu
