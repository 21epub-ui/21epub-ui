import printer from './utils/printer.mjs'
const userAgent = process.env.npm_config_user_agent
const packageManager = userAgent?.split(' ')[0].split('/')

if (
  packageManager?.[0] !== 'yarn' ||
  Number(packageManager[1].split('.')[0]) < 2
) {
  console.error(printer.red('Use "yarn" for installation in this project.'))
  process.kill(process.pid)
}
