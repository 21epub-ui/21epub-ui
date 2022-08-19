import { execute } from '@yarnpkg/shell'

await execute('yarn')
await execute('yarn husky install')
