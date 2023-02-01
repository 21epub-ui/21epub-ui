import { execute } from '@yarnpkg/shell'

const packages = [
  'eslint',
  'prettier',
  'typescript',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
]

await execute('yarn set version latest')
await execute(`yarn up ${packages.join(' ')}`)
await execute('yarn dlx @yarnpkg/sdks vscode')
