import { resolve } from 'node:path'
import { env } from 'node:process'

const getPackagePath = (packageName) => {
  const projectPath = env.PROJECT_CWD

  if (packageName === 'root') return projectPath

  return resolve(projectPath, 'packages', packageName)
}

export default getPackagePath
