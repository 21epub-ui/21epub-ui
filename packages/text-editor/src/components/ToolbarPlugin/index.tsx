import { Box, Divider, HStack, IconButton } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelectionStyleValueForProperty } from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import type { RangeSelection } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import {
  BoldIcon,
  ItalicIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from '../Icons'
import getSelectionType from '../../helpers/getSelectionType'
import FormatMenu from '../FormatMenu'

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [selectionType, setSelectionType] = useState('paragraph')
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [fontFamily, setFontFamily] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [color, setColor] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const getSelectionStyles = useCallback((selection: RangeSelection) => {
    setIsBold(selection.hasFormat('bold'))
    setIsItalic(selection.hasFormat('italic'))
    setIsUnderline(selection.hasFormat('underline'))
    setIsStrikethrough(selection.hasFormat('strikethrough'))

    setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family'))
    setFontSize($getSelectionStyleValueForProperty(selection, 'font-size'))
    setColor($getSelectionStyleValueForProperty(selection, 'color'))
    setBackgroundColor(
      $getSelectionStyleValueForProperty(selection, 'background-color')
    )
  }, [])

  const onSelectionChange = useCallback(() => {
    const selection = $getSelection()

    if (!$isRangeSelection(selection)) return

    getSelectionStyles(selection)
    setSelectionType(getSelectionType(editor, selection))
  }, [editor, getSelectionStyles])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        onSelectionChange()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, onSelectionChange])

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          onSelectionChange()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [activeEditor, onSelectionChange])

  return (
    <HStack
      spacing="2px"
      padding="4px"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <IconButton
        aria-label="Undo"
        icon={UndoIcon}
        disabled={!canUndo}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      />
      <IconButton
        aria-label="Redo"
        icon={RedoIcon}
        disabled={!canRedo}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      />
      <Divider orientation="vertical" />
      <Box>
        <FormatMenu
          disabled={editor === activeEditor}
          editor={editor}
          selectionType={selectionType}
        />
      </Box>
      <Divider orientation="vertical" />
      <IconButton
        aria-label="Bold"
        variant={isBold ? 'solid' : 'ghost'}
        icon={BoldIcon}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      />
      <IconButton
        aria-label="Italic"
        variant={isItalic ? 'solid' : 'ghost'}
        icon={ItalicIcon}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
      />
      <IconButton
        aria-label="Underline"
        variant={isUnderline ? 'solid' : 'ghost'}
        icon={UnderlineIcon}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
      />
      <IconButton
        aria-label="Strikethrough"
        variant={isStrikethrough ? 'solid' : 'ghost'}
        icon={StrikethroughIcon}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }}
      />
    </HStack>
  )
}

export default ToolbarPlugin
