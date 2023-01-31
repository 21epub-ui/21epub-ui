import { resolve } from 'node:path'
import { env } from 'node:process'

const getPackagePath = (name) => {
  const projectPath = env.PROJECT_CWD

  if (name === 'root') return projectPath

  return resolve(projectPath, 'packages', name)
}

export default getPackagePath
