import type { LexicalEditor, RangeSelection } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'

const getSelection = (
  editor: LexicalEditor,
  callback: (selection: RangeSelection) => void
) => {
  editor.update(() => {
    const selection = $getSelection()

    if (!$isRangeSelection(selection)) return

    callback(selection)
  })
}

export default getSelection
