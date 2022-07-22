import { ColorPicker } from '@21epub-ui/color-picker'
import { Box, Divider, HStack } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $wrapLeafNodesInElements,
} from '@lexical/selection'
import { mergeRegister } from '@lexical/utils'
import type { RangeSelection } from 'lexical'
import { $createParagraphNode } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import {
  TbArrowBackUp,
  TbArrowForwardUp,
  TbBold,
  TbIndentDecrease,
  TbIndentIncrease,
  TbItalic,
  TbList,
  TbListNumbers,
  TbStrikethrough,
  TbUnderline,
} from 'react-icons/tb'
import { editorCommands, editorTypefaces } from '../../config'
import getNodeType from '../../helpers/getNodeType'
import getRootNode from '../../helpers/getRootNode'
import getSelection from '../../helpers/getSelection'
import FontColorIcon from '../../icons/FontColorIcon'
import HighlightIcon from '../../icons/HighlightIcon'
import FontSizeMenu from '../../components/FontSizeMenu'
import LabelButton from '../../components/LabelButton'
import TagMenu from '../../components/TagMenu'
import TextAlignMenu from '../../components/TextAlignMenu'
import TypefaceMenu from '../../components/TypefaceMenu'
import InsertionMenu from '../../components/InsertionMenu'
import { $createHeadingNode } from '@lexical/rich-text'
import type { TagType, TextEditorProps } from '../../index.types'

interface ToolbarPluginProps {
  disabled?: boolean
  onDispatchCommand?: TextEditorProps['onDispatchCommand']
}

const ToolbarPlugin: React.FC<ToolbarPluginProps> = ({
  disabled,
  onDispatchCommand,
}) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [nodeTag, setNodeTag] = useState('')
  const [nodeType, setNodeType] = useState('')
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isRlt, setIsRlt] = useState(false)
  const [fontFamily, setFontFamily] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [textColor, setTextColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [textAlign, setTextAlign] = useState('')

  const isActiveEditor = !disabled && editor === activeEditor

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

    const node = getRootNode(editor, selection)

    if (node !== null) {
      setNodeType(getNodeType(node))
      setNodeTag(node.getTag?.())
      setTextAlign(node.getFormatType())
    }
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

    if (nodeType !== type) {
      return dispatchCommand(command)
    } else {
      return dispatchCommand('removeList')
    }
  }

  const updateSelectionTag = (value: TagType) => {
    getSelection(editor, (selection) => {
      const creator =
        value === 'p' ? $createParagraphNode : () => $createHeadingNode(value)

      $wrapLeafNodesInElements(selection, creator)
    })
  }

  const updateSelectionStyles = (styles: Record<string, string>) => {
    getSelection(editor, (selection) => $patchStyleText(selection, styles))
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
        icon={<TbArrowBackUp />}
        disabled={disabled || !canUndo}
        onClick={() => dispatchCommand('undo')}
      />
      <LabelButton
        label="重做"
        icon={<TbArrowForwardUp />}
        disabled={disabled || !canRedo}
        onClick={() => dispatchCommand('redo')}
      />
      <Divider orientation="vertical" />
      <Box>
        <TagMenu
          disabled={!isActiveEditor}
          value={nodeTag}
          onSelect={updateSelectionTag}
        />
      </Box>
      <Box>
        <TypefaceMenu
          disabled={disabled}
          value={fontFamily}
          onSelect={(value) => {
            updateSelectionStyles({ 'font-family': editorTypefaces[value] })
          }}
        />
      </Box>
      <Box>
        <FontSizeMenu
          disabled={disabled || nodeType === 'heading'}
          value={fontSize}
          onSelect={(value) => updateSelectionStyles({ 'font-size': value })}
        />
      </Box>
      <Divider orientation="vertical" />
      <LabelButton
        label="粗体"
        icon={<TbBold />}
        disabled={disabled || nodeType === 'heading'}
        isFocused={isBold}
        onClick={() => dispatchCommand('formatText', 'bold')}
      />
      <LabelButton
        label="斜体"
        icon={<TbItalic />}
        disabled={disabled}
        isFocused={isItalic}
        onClick={() => dispatchCommand('formatText', 'italic')}
      />
      <LabelButton
        label="下划线"
        icon={<TbUnderline />}
        disabled={disabled}
        isFocused={isUnderline}
        onClick={() => dispatchCommand('formatText', 'underline')}
      />
      <LabelButton
        label="删除线"
        icon={<TbStrikethrough />}
        disabled={disabled}
        isFocused={isStrikethrough}
        onClick={() => dispatchCommand('formatText', 'strikethrough')}
      />
      <ColorPicker
        defaultColor={textColor}
        onChange={(color) => {
          updateSelectionStyles({ color: color.toRgbString() })
        }}
      >
        <LabelButton
          label="文本颜色"
          icon={<FontColorIcon color={textColor} />}
          disabled={disabled}
        />
      </ColorPicker>
      <ColorPicker
        defaultColor={bgColor}
        onChange={(color) => {
          updateSelectionStyles({ 'background-color': color.toRgbString() })
        }}
      >
        <LabelButton
          label="文本高亮"
          icon={<HighlightIcon color={bgColor} />}
          disabled={disabled}
        />
      </ColorPicker>
      <Divider orientation="vertical" />
      <LabelButton
        label="有序列表"
        icon={<TbListNumbers />}
        disabled={!isActiveEditor}
        isFocused={nodeType === 'number'}
        onClick={() => dispatchInsertListCommand('number')}
      />
      <LabelButton
        label="无序列表"
        icon={<TbList />}
        disabled={!isActiveEditor}
        isFocused={nodeType === 'bullet'}
        onClick={() => dispatchInsertListCommand('bullet')}
      />
      <LabelButton
        label="增加缩进"
        icon={<TbIndentIncrease />}
        disabled={disabled}
        onClick={() => {
          dispatchCommand(isRlt ? 'outdentContent' : 'indentContent')
        }}
      />
      <LabelButton
        label="减少缩进"
        icon={<TbIndentDecrease />}
        disabled={disabled}
        onClick={() => {
          dispatchCommand(isRlt ? 'indentContent' : 'outdentContent')
        }}
      />
      <Divider orientation="vertical" />
      <TextAlignMenu
        disabled={disabled}
        value={textAlign}
        onSelect={(value) => dispatchCommand('formatElement', value)}
      />
      <Divider orientation="vertical" />
      <InsertionMenu
        disabled={disabled}
        onSelect={(value) => onDispatchCommand?.(value, activeEditor)}
      />
    </HStack>
  )
}

export default ToolbarPlugin
