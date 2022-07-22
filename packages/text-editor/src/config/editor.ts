import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import {
  HorizontalRuleNode,
  INSERT_HORIZONTAL_RULE_COMMAND,
} from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode } from '@lexical/rich-text'
import type { EditorThemeClasses } from 'lexical'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { ImageNode } from '../nodes/ImageNode'
import { INSERT_IMAGE_COMMAND } from '../plugins/ImagePlugin'
import combineFontFamily from '../utils/combineFontFamily'

export const editorNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  HorizontalRuleNode,
  ImageNode,
]

export const editorCommands = {
  selectionChange: SELECTION_CHANGE_COMMAND,
  undo: UNDO_COMMAND,
  redo: REDO_COMMAND,
  canUndo: CAN_UNDO_COMMAND,
  canRedo: CAN_REDO_COMMAND,
  formatText: FORMAT_TEXT_COMMAND,
  insertOrderedList: INSERT_ORDERED_LIST_COMMAND,
  insertUnorderedList: INSERT_UNORDERED_LIST_COMMAND,
  removeList: REMOVE_LIST_COMMAND,
  indentContent: INDENT_CONTENT_COMMAND,
  outdentContent: OUTDENT_CONTENT_COMMAND,
  formatElement: FORMAT_ELEMENT_COMMAND,
  insertHorizontalRule: INSERT_HORIZONTAL_RULE_COMMAND,
  insertImage: INSERT_IMAGE_COMMAND,
}

export const editorTheme: EditorThemeClasses = {
  ltr: 'editor-ltr',
  rtl: 'editor-rtl',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-h1',
    h2: 'editor-h2',
    h3: 'editor-h3',
    h4: 'editor-h4',
    h5: 'editor-h5',
    h6: 'editor-h6',
  },
  list: {
    ol: 'editor-ol',
    olDepth: ['editor-ol1', 'editor-ol2', 'editor-ol3'],
    ul: 'editor-ul',
    listitem: 'editor-li',
    nested: {
      listitem: 'editor-li-nested',
    },
  },
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
    strikethrough: 'editor-text-strikethrough',
    underlineStrikethrough: 'editor-text-underline-strikethrough',
    code: 'editor-text-code',
  },
}

export const editorTypefaces = {
  sansSerif: combineFontFamily(['system-ui', 'sans-serif']),
  serif: combineFontFamily(['Times New Roman', 'Songti SC', 'SimSun', 'serif']),
  monospace: combineFontFamily([
    'SF Mono',
    'Source Code Pro',
    'Consolas',
    'monospace',
  ]),
}

export const editorStyles = {
  fontFamily: editorTypefaces.sansSerif,
  fontSize: '11pt',
  lineHeight: '1.7',
  color: '#333',
  backgroundColor: '#fff',
}
