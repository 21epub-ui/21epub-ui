import fs from 'fs-extra'
import path from 'path'

const generateConfig = async (outputPath, fileName, config) => {
  const template = await fs.readJSON(
    new URL(`../templates/${fileName}`, import.meta.url)
  )

  await fs.outputJson(
    path.resolve(outputPath, fileName),
    { ...template, ...config },
    { spaces: 2 }
  )
}

export default generateConfig
