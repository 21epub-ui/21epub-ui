import type { TreeNode } from '@21epub-ui/tree'
import { Tree } from '@21epub-ui/tree'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const genTreeNodes = (parent = '', level = 0) => {
  return Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map(
    (_, index): TreeNode => {
      const number = index + 1
      const id = parent ? `${parent}-${number.toString()}` : number.toString()

      if (Math.round(Math.random()) === 0 && level < 2) {
        return {
          id,
          children: genTreeNodes(id, level + 1),
        }
      }

      return { id }
    }
  )
}

const treeNodes = genTreeNodes()

export const Default: StoryObj<typeof Tree> = {
  args: {
    indent: 24,
    rowHeight: 32,
    data: {
      id: 'root',
      children: treeNodes,
    },
  },
  render: (args) => {
    const [selectedNodes, setSelectedNodes] = useState<string[]>([])
    const [expandedNodes, setExpandedNodes] = useState<string[]>([])

    return (
      <Tree
        {...args}
        style={{
          position: 'relative',
          overflowX: 'hidden',
          userSelect: 'none',
        }}
        expandedIds={expandedNodes}
        selectedIds={selectedNodes}
        renderNode={({ data, indent, isSelected, isHovering }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              paddingLeft: indent,
              borderRadius: 2,
              outline: isHovering ? '1px solid deepskyblue' : undefined,
              outlineOffset: -1,
              backgroundColor: isSelected ? 'lightskyblue' : undefined,
            }}
          >
            <div style={{ padding: '0 8px' }}>{data.id}</div>
          </div>
        )}
        renderCursor={({ top, left }) => (
          <div
            style={{
              top,
              left,
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: 'black',
            }}
          />
        )}
        onNodeSelect={setSelectedNodes}
        onNodeToggle={setExpandedNodes}
      />
    )
  },
}

const meta: Meta<typeof Tree> = {
  title: 'Tree',
  component: Tree,
}

export default meta
