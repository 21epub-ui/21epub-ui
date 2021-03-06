import outputJson from '../utils/outputJson.mjs'
import { resolve } from 'path'

const genPackage = (dirPath, { packageName }) => {
  const filePath = resolve(dirPath, 'package.json')

  const template = {
    name: packageName,
    version: '0.0.0',
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
    typings: 'dist/index.d.ts',
    sideEffects: false,
    files: ['dist'],
    scripts: {
      preinstall: 'node ../../scripts/preinstall.mjs',
      dev: 'yarn node ../../scripts/dev.mjs',
      build: 'yarn node ../../scripts/build.mjs',
      lint: 'yarn node ../../scripts/lint.mjs',
      version: 'yarn node ../../scripts/version.mjs',
    },
    peerDependencies: {
      '@emotion/react': '>=11.*',
      '@emotion/styled': '>=11.*',
      react: '>=17.*',
    },
    devDependencies: {
      '@emotion/react': '^11.9.3',
      '@emotion/styled': '^11.9.3',
      '@storybook/react': '^6.5.9',
      '@types/react': '^17',
    },
  }

  return outputJson(filePath, template)
}

export default genPackage
