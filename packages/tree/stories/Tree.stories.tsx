import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { useRef, useState } from 'react'
import type { TreeNode } from '@21epub-ui/tree'
import { Tree } from '@21epub-ui/tree'

export default {
  title: 'Tree/Default',
  component: Tree,
} as ComponentMeta<typeof Tree>

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

const Template: ComponentStory<typeof Tree> = (args) => {
  const treeData = useRef({
    id: 'root',
    children: treeNodes,
  })

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
      data={treeData.current}
      indent={24}
      rowHeight={32}
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
      onNodeSelect={(ids) => setSelectedNodes(ids)}
      onNodeToggle={setExpandedNodes}
    />
  )
}

export const Default = Template.bind({})

Default.args = {}
