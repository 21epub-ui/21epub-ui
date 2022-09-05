import { resolve } from 'path'

const getPackagePath = (name) => {
  const projectPath = process.env.PROJECT_CWD

  if (name === 'root') return projectPath

  return resolve(projectPath, 'packages', name)
}

export default getPackagePath
