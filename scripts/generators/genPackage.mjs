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
      react: '>=16.8.0',
      'react-dom': '>=16.8.0',
    },
    dependencies: {
      '@emotion/react': '^11.9.0',
      '@emotion/styled': '^11.8.1',
    },
    devDependencies: {
      '@storybook/react': '^6.4.0',
      '@types/react': '^17',
      '@types/react-dom': '^17',
    },
  }

  return outputJson(filePath, template)
}

export default genPackage
