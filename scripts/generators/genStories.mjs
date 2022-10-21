import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'
import getName from '../utils/getName.mjs'
import getPackageName from '../utils/getPackageName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import kebabToPascal from '../utils/kebabToPascal.mjs'

const genStories = async () => {
  const name = getName()
  const packageName = await getPackageName()
  const componentName = kebabToPascal(name)

  const dirPath = resolve(getPackagePath(name))
  const filePath = resolve(dirPath, 'stories', `${componentName}.stories.tsx`)

  const template = dedent(`
    import type { ComponentMeta, ComponentStory } from '@storybook/react'
    import { ${componentName} } from '${packageName}'

    export default {
      title: '${componentName}/Default',
      component: ${componentName},
    } as ComponentMeta<typeof ${componentName}>

    const Template: ComponentStory<typeof ${componentName}> = (args) => (
      <${componentName} {...args} />
    )

    export const Default = Template.bind({})

    Default.args = {}
  `)

  await fs.outputFile(filePath, template)
}

export default genStories
