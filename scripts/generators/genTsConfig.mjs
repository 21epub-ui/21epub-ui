import outputJson from '../utils/outputJson.mjs'
import { resolve } from 'path'

const genTsConfig = (dirPath) => {
  const filePath = resolve(dirPath, 'tsconfig.json')

  const template = {
    extends: '../../tsconfig.json',
    include: ['./src'],
  }

  return outputJson(filePath, template)
}

export default genTsConfig
