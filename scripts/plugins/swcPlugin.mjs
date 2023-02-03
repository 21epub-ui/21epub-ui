import deepmerge from '@fastify/deepmerge'
import { transformFile } from '@swc/core'
import { basename } from 'node:path'

const deepMergeAll = deepmerge({ all: true })

const swcPlugin = ({ filter, swcOptions = {} } = {}) => {
  return {
    name: 'swc',
    setup(builder) {
      builder.onLoad({ filter: filter ?? /\.[tj]sx?$/ }, async ({ path }) => {
        const isJs = path.endsWith('.js') || path.endsWith('.jsx')
        const isJsx = path.endsWith('x')

        const parser = isJs
          ? { syntax: 'ecmascript', jsx: isJsx }
          : { syntax: 'typescript', tsx: isJsx }

        const defaultOptions = {
          jsc: { parser },
        }

        const initialOptions = deepMergeAll(defaultOptions, swcOptions, {
          sourceMaps: builder.initialOptions.sourcemap && 'inline',
          sourceFileName: basename(path),
        })

        const { code } = await transformFile(path, initialOptions)

        return { contents: code }
      })
    },
  }
}

export default swcPlugin
