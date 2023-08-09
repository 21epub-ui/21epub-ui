import deepmerge from '@fastify/deepmerge'
import { cwd } from 'node:process'
import ts from 'typescript'

const deepMergeAll = deepmerge({ all: true })

const defaultFilter = /\.([mc]?[jt]s|[jt]sx)$/

const typescriptPlugin = ({
  filter = defaultFilter,
  typescriptOptions = {},
} = {}) => {
  return {
    name: 'typescript',
    setup(builder) {
      const filePaths = []

      builder.onLoad({ filter }, ({ path }) => {
        if (path.includes('node_modules')) return

        filePaths.push(path)
      })

      const basePath = cwd()
      const configPath = ts.findConfigFile(basePath, ts.sys.fileExists)

      if (configPath === undefined) throw new Error('tsconfig.json not found')

      const defaultOptions = {
        compilerOptions: {
          allowJs: true,
          declaration: true,
          emitDeclarationOnly: true,
          declarationDir:
            typescriptOptions.compilerOptions?.outDir ??
            builder.initialOptions.outdir,
        },
      }

      const { config } = ts.readConfigFile(configPath, ts.sys.readFile)
      const { options, fileNames } = ts.parseJsonConfigFileContent(
        deepMergeAll(defaultOptions, config ?? {}, typescriptOptions),
        ts.sys,
        basePath
      )

      const incremental = options.composite || options.incremental

      const host = incremental
        ? ts.createIncrementalCompilerHost(options)
        : ts.createCompilerHost(options)

      builder.onEnd(() => {
        const rootNames = filePaths.concat(
          fileNames.filter((fileName) => fileName.endsWith('.d.ts'))
        )

        const program = incremental
          ? ts.createIncrementalProgram({
              rootNames,
              options,
              host,
            })
          : ts.createProgram(rootNames, options, host)

        const result = program.emit()

        const diagnostics = ts
          .getPreEmitDiagnostics(program)
          .concat(result.diagnostics)

        const output = ts.formatDiagnosticsWithColorAndContext(
          diagnostics,
          host
        )

        console.log(output)
      })
    },
  }
}

export default typescriptPlugin
