import { ESLint } from 'eslint'

const eslintPlugin = ({ filter, eslintOptions = {} } = {}) => {
  return {
    name: 'eslint',
    setup(builder) {
      const eslint = new ESLint(eslintOptions)

      const files = []

      builder.onLoad({ filter: filter ?? /\.[tj]sx?$/ }, async ({ path }) => {
        if (await eslint.isPathIgnored(path)) return

        files.push(path)
      })

      builder.onEnd(async () => {
        const results = await eslint.lintFiles(files)

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
