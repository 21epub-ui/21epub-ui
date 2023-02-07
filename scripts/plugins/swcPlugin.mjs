import deepmerge from '@fastify/deepmerge'
import { transformFile } from '@swc/core'
import { basename } from 'node:path'

const deepMergeAll = deepmerge({ all: true })

const defaultFilter = /\.([mc]?[jt]s|[jt]sx)$/

const swcPlugin = ({ filter = defaultFilter, swcOptions = {} } = {}) => {
  return {
    name: 'swc',
    setup(builder) {
      builder.onLoad({ filter }, async ({ path }) => {
        /**
         * @see https://github.com/microsoft/TypeScript/issues/44442
         */
        const isJs = /\.([mc]?js|jsx)$/.test(path)
        const isJsx = /\.([mc][jt]s|[jt]sx)$/.test(path)

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
