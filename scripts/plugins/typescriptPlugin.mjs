import deepmerge from '@fastify/deepmerge'
import { cwd } from 'node:process'
import ts from 'typescript'

const deepMergeAll = deepmerge({ all: true })

const typescriptPlugin = ({ filter, typescriptOptions = {} } = {}) => {
  return {
    name: 'typescript',
    setup(builder) {
      const rootNames = []

      builder.onLoad({ filter: filter ?? /\.[tj]sx?$/ }, ({ path }) => {
        if (path.includes('node_modules')) return

        rootNames.push(path)
      })

      const basePath = cwd()

      const configPath = ts.findConfigFile(basePath, ts.sys.fileExists)

      if (configPath === undefined) throw new Error('tsconfig.json not found')

      const defaultOptions = {
        compilerOptions: {
          allowJs: true,
          declaration: true,
          declarationMap: true,
          emitDeclarationOnly: true,
          declarationDir:
            typescriptOptions.compilerOptions.outDir ??
            builder.initialOptions.outdir,
        },
      }

      const { config = {} } = ts.readConfigFile(configPath, ts.sys.readFile)
      const { options } = ts.parseJsonConfigFileContent(
        deepMergeAll(defaultOptions, config, typescriptOptions),
        ts.sys,
        basePath
      )

      const incremental = options.composite || options.incremental

      const host = incremental
        ? ts.createIncrementalCompilerHost(options)
        : ts.createCompilerHost(options)

      builder.onEnd(() => {
        const program = incremental
          ? ts.createIncrementalProgram({
              rootNames,
              options,
              host,
            })
          : ts.createProgram(rootNames, options, host)

        program.emit()
      })
    },
  }
}

export default typescriptPlugin
