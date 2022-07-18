import { Box, Divider, HStack } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import type { LexicalNode, RangeSelection } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import { editorCommands } from '../../config'
import getButtonVariant from '../../helpers/getButtonVariant'
import getSelectionNode from '../../helpers/getSelectionType'
import FontFamilyMenu from '../FontFamilyMenu'
import FontSizeMenu from '../FontSizeMenu'
import TagMenu from '../TagMenu'
import {
  boldIcon,
  indentIcon,
  italicIcon,
  orderedListIcon,
  outdentIcon,
  redoIcon,
  strikethroughIcon,
  underlineIcon,
  undoIcon,
  unorderedListIcon,
} from '../Icons'
import TipButton from '../TipButton'

interface ToolbarPluginProps {
  disabled?: boolean
}

const ToolbarPlugin: React.FC<ToolbarPluginProps> = ({ disabled }) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [selectionNode, setSelectionNode] = useState<LexicalNode | null>(null)
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
  const [isRlt, setIsRlt] = useState(false)

  const editorActive = !disabled && editor === activeEditor
  const selectionNodeType = selectionNode?.getType?.()
  const selectionNodeListType = selectionNode?.getListType?.()

  useEffect(() => {
    editor.setReadOnly(disabled ?? false)
  }, [disabled, editor])

  const getSelectionStyles = useCallback((selection: RangeSelection) => {
    setIsBold(selection.hasFormat('bold'))
    setIsItalic(selection.hasFormat('italic'))
    setIsUnderline(selection.hasFormat('underline'))
    setIsStrikethrough(selection.hasFormat('strikethrough'))
    setIsRlt($isParentElementRTL(selection))

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

    setSelectionNode(getSelectionNode(editor, selection))
  }, [editor, getSelectionStyles])

  useEffect(() => {
    return editor.registerCommand(
      editorCommands.selectionChange,
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
        editorCommands.canUndo,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        editorCommands.canRedo,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [activeEditor, onSelectionChange])

  const dispatchCommand: <P>(
    type: keyof typeof editorCommands,
    payload?: P
  ) => boolean = (type, payload) => {
    const command = editorCommands[type]

    if (command === undefined) return false

    return activeEditor.dispatchCommand(editorCommands[type], payload)
  }

  const dispatchInsertListCommand = (type: 'number' | 'bullet') => {
    const command =
      type === 'number' ? 'insertOrderedList' : 'insertUnorderedList'

    if (selectionNodeListType !== type) {
      return dispatchCommand(command)
    } else {
      return dispatchCommand('removeList')
    }
  }

  return (
    <HStack
      spacing="2px"
      padding="4px"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
    >
      <TipButton
        label="撤销"
        icon={undoIcon}
        disabled={disabled || !canUndo}
        onClick={() => dispatchCommand('undo')}
      />
      <TipButton
        label="重做"
        icon={redoIcon}
        disabled={disabled || !canRedo}
        onClick={() => dispatchCommand('redo')}
      />
      <Divider orientation="vertical" />
      <Box>
        <TagMenu
          disabled={!editorActive}
          editor={editor}
          selectionTag={selectionNode?.getTag?.()}
        />
      </Box>
      <Box>
        <FontFamilyMenu
          disabled={disabled}
          editor={editor}
          selectionFontFamily={fontFamily}
        />
      </Box>
      <Box>
        <FontSizeMenu
          disabled={disabled || selectionNodeType === 'heading'}
          editor={editor}
          selectionFontSize={fontSize}
        />
      </Box>
      <Divider orientation="vertical" />
      <TipButton
        label="粗体"
        disabled={disabled || selectionNodeType === 'heading'}
        variant={getButtonVariant(isBold)}
        icon={boldIcon}
        onClick={() => dispatchCommand('formatText', 'bold')}
      />
      <TipButton
        label="斜体"
        disabled={disabled}
        variant={getButtonVariant(isItalic)}
        icon={italicIcon}
        onClick={() => dispatchCommand('formatText', 'italic')}
      />
      <TipButton
        label="下划线"
        disabled={disabled}
        variant={getButtonVariant(isUnderline)}
        icon={underlineIcon}
        onClick={() => dispatchCommand('formatText', 'underline')}
      />
      <TipButton
        label="删除线"
        disabled={disabled}
        variant={getButtonVariant(isStrikethrough)}
        icon={strikethroughIcon}
        onClick={() => dispatchCommand('formatText', 'strikethrough')}
      />
      <Divider orientation="vertical" />
      <TipButton
        label="有序列表"
        disabled={!editorActive}
        variant={getButtonVariant(selectionNodeListType === 'number')}
        icon={orderedListIcon}
        onClick={() => dispatchInsertListCommand('number')}
      />
      <TipButton
        label="无序列表"
        disabled={!editorActive}
        variant={getButtonVariant(selectionNodeListType === 'bullet')}
        icon={unorderedListIcon}
        onClick={() => dispatchInsertListCommand('bullet')}
      />
      <Divider orientation="vertical" />
      <TipButton
        label="增加缩进"
        disabled={disabled}
        icon={indentIcon}
        onClick={() => {
          dispatchCommand(isRlt ? 'outdentContent' : 'indentContent')
        }}
      />
      <TipButton
        label="减少缩进"
        disabled={disabled}
        icon={outdentIcon}
        onClick={() => {
          dispatchCommand(isRlt ? 'indentContent' : 'outdentContent')
        }}
      />
    </HStack>
  )
}

export default ToolbarPlugin
