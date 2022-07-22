import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import type { LexicalCommand } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isRootNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical'
import { useEffect } from 'react'
import type { ImagePayload } from '../../nodes/ImageNode'
import { $createImageNode, ImageNode } from '../../nodes/ImageNode'

export type InsertImagePayload = Readonly<ImagePayload>
export type InsertImageCommand = LexicalCommand<InsertImagePayload>

const insertImage = (payload: ImagePayload) => {
  const selection = $getSelection()

  if ($isRangeSelection(selection)) {
    if ($isRootNode(selection.anchor.getNode())) {
      selection.insertParagraph()
    }
    const imageNode = $createImageNode(payload)
    selection.insertNodes([imageNode])
  }

  return true
}

export const INSERT_IMAGE_COMMAND: InsertImageCommand = createCommand()

const ImagesPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => insertImage(payload),
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor])

  return null
}

export default ImagesPlugin
