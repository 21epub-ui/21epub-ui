import { execute } from '@yarnpkg/shell'

const { PROJECT_CWD } = process.env

await execute('yarn run lint')
await execute(`yarn g:rollup -c ${PROJECT_CWD}/rollup.config.js`)
