const userAgent = process.env.npm_config_user_agent
const packageManager = userAgent.split(' ')[0].split('/')

if (
  packageManager[0] !== 'yarn' ||
  Number(packageManager[1].split('.')[0]) < 2
) {
  console.error('\x1B[31mUse "yarn" for installation in this project.\x1B[0m')
  process.kill(process.pid)
}
