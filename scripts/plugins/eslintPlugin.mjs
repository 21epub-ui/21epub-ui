import { ESLint } from 'eslint'

const defaultFilter = /\.([mc]?[jt]s|[jt]sx)$/

const eslintPlugin = ({ filter = defaultFilter, eslintOptions = {} } = {}) => {
  return {
    name: 'eslint',
    setup(builder) {
      const eslint = new ESLint(eslintOptions)

      const filePaths = []

      builder.onLoad({ filter }, async ({ path }) => {
        if (await eslint.isPathIgnored(path)) return

        filePaths.push(path)
      })

      builder.onEnd(async () => {
        const results = await eslint.lintFiles(filePaths)

        if (eslintOptions.fix) {
          await ESLint.outputFixes(results)
        }

        const formatter = await eslint.loadFormatter('stylish')

        const output = await formatter.format(results)

        if (output.length === 0) return

        console.log(output)
      })
    },
  }
}

export default eslintPlugin
