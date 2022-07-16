import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode } from '@lexical/rich-text'
import type { EditorThemeClasses } from 'lexical'

export const editorNodes = [HeadingNode, ListNode, ListItemNode]

export const editorTheme: EditorThemeClasses = {
  ltr: 'ltr',
  rtl: 'rtl',
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

export const editorStyles = {
  fontFamily: ['system-ui', 'Helvetica Neue', 'Helvetica', 'sans-serif'].join(),
  fontSize: '11pt',
  lineHeight: '1.7',
  color: '#333',
  backgroundColor: '#fff',
}
