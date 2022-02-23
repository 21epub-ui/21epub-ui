import fs from 'fs-extra'
import { resolve } from 'path'
import dedent from '../utils/dedent.mjs'

const genDeclaration = (dirPath) => {
  const filePath = resolve(dirPath, 'src', 'typings', 'index.d.ts')

  const template = []

  const imageSuffixes = ['avif', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'webp']

  imageSuffixes.forEach((suffix) => {
    template.push(
      dedent(`
        declare module '*.${suffix}' {
          const src: string
          export default src
        }
      `)
    )
  })

  template.push(
    dedent(`
      declare module '*.svg' {
        import type React from 'react'

        export const ReactComponent: React.FunctionComponent<
          React.SVGProps<SVGSVGElement> & { title?: string }
        >

        const src: string
        export default src
      }
    `)
  )

  const styleSheetSuffixes = ['css', 'scss', 'sass']

  styleSheetSuffixes.forEach((suffix) => {
    template.push(
      dedent(`
        declare module '*.module.${suffix}' {
          const classes: { readonly [key: string]: string }
          export default classes
        }
      `)
    )
  })

  return fs.outputFile(filePath, template.join('\n'))
}

export default genDeclaration
