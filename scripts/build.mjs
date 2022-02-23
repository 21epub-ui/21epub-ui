import fs from 'fs-extra'
import { resolve } from 'path'
import { execute } from '@yarnpkg/shell'

const { PROJECT_CWD } = process.env

await fs.emptyDir(resolve('dist'))
await execute(`yarn g:rollup -c ${PROJECT_CWD}/rollup.config.js`)
