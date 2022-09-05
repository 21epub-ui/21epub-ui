import { execute } from '@yarnpkg/shell'
import { resolve } from 'path'
import getName from '../utils/getName.mjs'
import getPackageName from '../utils/getPackageName.mjs'
import getPackagePath from '../utils/getPackagePath.mjs'
import outputJson from '../utils/outputJson.mjs'

const genPackage = async () => {
  const name = getName()
  const packageName = await getPackageName()

  const dirPath = getPackagePath(name)
  const filePath = resolve(dirPath, 'package.json')

  const devDependencies = [
    '@emotion/react',
    '@emotion/styled',
    '@storybook/react',
    '@types/react@^18',
  ]

  const template = {
    name: packageName,
    version: '0.0.0',
    source: 'src/index.ts',
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
  }

  await outputJson(filePath, template)
  await execute(
    `yarn workspace ${packageName} add --dev ${devDependencies.join(' ')}`
  )
}

export default genPackage
