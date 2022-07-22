import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createHorizontalRuleNode,
  INSERT_HORIZONTAL_RULE_COMMAND,
} from '@lexical/react/LexicalHorizontalRuleNode'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { useEffect } from 'react'

const HorizontalRulePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      () => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection)) return false

        if (selection.focus.getNode() !== null) {
          const horizontalRuleNode = $createHorizontalRuleNode()

          selection.insertParagraph()
          selection.focus
            .getNode()
            .getTopLevelElementOrThrow()
            .insertBefore(horizontalRuleNode)
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

export default HorizontalRulePlugin
