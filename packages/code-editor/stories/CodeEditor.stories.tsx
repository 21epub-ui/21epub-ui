import { CodeEditor } from '@21epub-ui/code-editor'
import { javascript } from '@codemirror/lang-javascript'
import type { Meta, StoryObj } from '@storybook/react'

export const Default: StoryObj<typeof CodeEditor> = {
  args: {},
  render: (args) => (
    <CodeEditor
      {...args}
      initialConfig={{ ...args.initialConfig, extensions: [javascript()] }}
      onChange={(editorState) => {
        console.log(editorState.doc, editorState.toJSON())
      }}
    />
  ),
}

const meta: Meta<typeof CodeEditor> = {
  title: 'CodeEditor',
  component: CodeEditor,
}

export default meta
