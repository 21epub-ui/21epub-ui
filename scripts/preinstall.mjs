import { env, kill, pid } from 'node:process'
import printer from './utils/printer.mjs'

const userAgent = env.npm_config_user_agent
const packageManager = userAgent?.split(' ').at(0)?.split('/')

if (
  packageManager?.at(0) !== 'yarn' ||
  Number(packageManager?.at(1)?.split('.').at(0) ?? 0) < 2
) {
  console.error(printer.red('Use "yarn" for installation in this project.'))
  kill(pid)
}
