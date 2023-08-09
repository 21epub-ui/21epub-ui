import ts from 'typescript'

const getTypescriptOptions = (basePath) => {
  const path = ts.findConfigFile(basePath, ts.sys.fileExists)

  if (path === undefined) return

  const config = ts.readConfigFile(path, ts.sys.readFile).config

  if (config === undefined) return

  return ts.parseJsonConfigFileContent(config, ts.sys, basePath).options
}

export default getTypescriptOptions
