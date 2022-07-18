import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { $createHeadingNode } from '@lexical/rich-text'
import { $wrapLeafNodesInElements } from '@lexical/selection'
import type { ElementNode, LexicalEditor } from 'lexical'
import { $createParagraphNode } from 'lexical'
import getMenuItemBackground from '../../helpers/getMenuItemBackground'
import updateSelectionStyle from '../../helpers/updateSelectionStyle'
import {
  heading1Icon,
  heading2Icon,
  heading3Icon,
  paragraphIcon,
} from '../Icons'

interface TagMenuProps {
  disabled?: boolean
  editor: LexicalEditor
  selectionTag: string
}

const TagMenu: React.FC<TagMenuProps> = ({
  disabled,
  editor,
  selectionTag,
}) => {
  const updateSelectionTag = (callback: () => ElementNode) => {
    updateSelectionStyle(editor, (selection) => {
      $wrapLeafNodesInElements(selection, callback)
    })
  }

  const menuItems = {
    paragraph: {
      icon: paragraphIcon,
      text: '正文',
      onClick: () => updateSelectionTag($createParagraphNode),
    },
    h1: {
      icon: heading1Icon,
      text: '标题1',
      onClick: () => updateSelectionTag(() => $createHeadingNode('h1')),
    },
    h2: {
      icon: heading2Icon,
      text: '标题2',
      onClick: () => updateSelectionTag(() => $createHeadingNode('h2')),
    },
    h3: {
      icon: heading3Icon,
      text: '标题3',
      onClick: () => updateSelectionTag(() => $createHeadingNode('h3')),
    },
  }

  const activeMenuItem = menuItems[selectionTag] ?? menuItems['paragraph']

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
      <MenuList borderColor="gray.200" minWidth="50px">
        {Object.entries(menuItems).map(([key, { icon, text, onClick }]) => (
          <MenuItem
            key={key}
            backgroundColor={getMenuItemBackground(selectionTag === key)}
            icon={icon}
            onClick={onClick}
          >
            {text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default TagMenu
