import { ColorPicker } from '@21epub-ui/color-picker'
import { Box, Divider, HStack } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import type { LexicalNode, RangeSelection } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsListOl,
  BsListUl,
  BsTextIndentLeft,
  BsTextIndentRight,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs'
import { editorCommands } from '../../config'
import getSelection from '../../helpers/getSelection'
import getSelectionNode from '../../helpers/getSelectionType'
import FontColorIcon from '../../icons/FontColorIcon'
import HighlightIcon from '../../icons/HighlightIcon'
import FontSizeMenu from '../FontSizeMenu'
import LabelButton from '../LabelButton'
import TagMenu from '../TagMenu'
import TypefaceMenu from '../TypefaceMenu'

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
  const [textColor, setTextColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isRlt, setIsRlt] = useState(false)

  const isActiveEditor = !disabled && editor === activeEditor
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
    setTextColor($getSelectionStyleValueForProperty(selection, 'color'))
    setBgColor(
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
      <LabelButton
        label="撤销"
        disabled={disabled || !canUndo}
        onClick={() => dispatchCommand('undo')}
      >
        <BsArrowCounterclockwise />
      </LabelButton>
      <LabelButton
        label="重做"
        disabled={disabled || !canRedo}
        onClick={() => dispatchCommand('redo')}
      >
        <BsArrowClockwise />
      </LabelButton>
      <Divider orientation="vertical" />
      <Box>
        <TagMenu
          disabled={!isActiveEditor}
          editor={editor}
          value={selectionNode?.getTag?.()}
        />
      </Box>
      <Box>
        <TypefaceMenu disabled={disabled} editor={editor} value={fontFamily} />
      </Box>
      <Box>
        <FontSizeMenu
          disabled={disabled || selectionNodeType === 'heading'}
          editor={editor}
          value={fontSize}
        />
      </Box>
      <Divider orientation="vertical" />
      <LabelButton
        label="粗体"
        disabled={disabled || selectionNodeType === 'heading'}
        isFocused={isBold}
        onClick={() => dispatchCommand('formatText', 'bold')}
      >
        <BsTypeBold />
      </LabelButton>
      <LabelButton
        label="斜体"
        disabled={disabled}
        isFocused={isItalic}
        onClick={() => dispatchCommand('formatText', 'italic')}
      >
        <BsTypeItalic />
      </LabelButton>
      <LabelButton
        label="下划线"
        disabled={disabled}
        isFocused={isUnderline}
        onClick={() => dispatchCommand('formatText', 'underline')}
      >
        <BsTypeUnderline />
      </LabelButton>
      <LabelButton
        label="删除线"
        disabled={disabled}
        isFocused={isStrikethrough}
        onClick={() => dispatchCommand('formatText', 'strikethrough')}
      >
        <BsTypeStrikethrough />
      </LabelButton>
      <ColorPicker
        defaultColor={textColor}
        onChange={(color) => {
          getSelection(editor, (selection) => {
            $patchStyleText(selection, { color: color.toRgbString() })
          })
        }}
      >
        <LabelButton label="文本颜色" disabled={disabled}>
          <FontColorIcon color={textColor} />
        </LabelButton>
      </ColorPicker>
      <ColorPicker
        defaultColor={bgColor}
        onChange={(color) => {
          getSelection(editor, (selection) => {
            $patchStyleText(selection, {
              'background-color': color.toRgbString(),
            })
          })
        }}
      >
        <LabelButton label="文本高亮" disabled={disabled}>
          <HighlightIcon color={bgColor} />
        </LabelButton>
      </ColorPicker>
      <Divider orientation="vertical" />
      <LabelButton
        label="有序列表"
        disabled={!isActiveEditor}
        isFocused={selectionNodeListType === 'number'}
        onClick={() => dispatchInsertListCommand('number')}
      >
        <BsListOl />
      </LabelButton>
      <LabelButton
        label="无序列表"
        disabled={!isActiveEditor}
        isFocused={selectionNodeListType === 'bullet'}
        onClick={() => dispatchInsertListCommand('bullet')}
      >
        <BsListUl />
      </LabelButton>
      <LabelButton
        label="增加缩进"
        disabled={disabled}
        onClick={() => {
          dispatchCommand(isRlt ? 'outdentContent' : 'indentContent')
        }}
      >
        <BsTextIndentLeft />
      </LabelButton>
      <LabelButton
        label="减少缩进"
        disabled={disabled}
        onClick={() => {
          dispatchCommand(isRlt ? 'indentContent' : 'outdentContent')
        }}
      >
        <BsTextIndentRight />
      </LabelButton>
    </HStack>
  )
}

export default ToolbarPlugin
