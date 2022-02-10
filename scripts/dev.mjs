import { execute } from '@yarnpkg/shell'

const { PROJECT_CWD } = process.env

await execute(`yarn g:rollup -w -c ${PROJECT_CWD}/rollup.config.js`)
