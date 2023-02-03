import { execute } from '@yarnpkg/shell'
import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getScopedPackageName from '../helpers/getScopedPackageName.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import outputJson from '../helpers/outputJson.mjs'

const genPackage = async () => {
  const packageName = getFirstArgv()
  const scopedPackageName = await getScopedPackageName(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'package.json')

  const devDependencies = [
    '@emotion/react',
    '@emotion/styled',
    '@storybook/react',
    '@types/react@^18',
  ]

  const template = {
    name: scopedPackageName,
    version: '0.0.0',
    source: 'src/index.ts',
    main: 'dist/index.js',
    module: 'dist/index.esm.js',
    typings: 'dist/index.d.ts',
    sideEffects: false,
    files: ['dist'],
    scripts: {
      preinstall: 'node ../../scripts/preinstall.mjs',
      build: 'yarn node ../../scripts/build.mjs',
      lint: 'yarn node ../../scripts/lint.mjs',
      version: 'yarn node ../../scripts/version.mjs',
    },
    peerDependencies: {
      '@emotion/react': '>=11.*',
      '@emotion/styled': '>=11.*',
      react: '>=17.*',
    },
  }

  await outputJson(filePath, template)
  await execute(
    `yarn workspace ${scopedPackageName} add --dev ${devDependencies.join(' ')}`
  )
}

export default genPackage
