import { execute } from '@yarnpkg/shell'
import { resolve } from 'node:path'
import getFirstArgv from '../helpers/getFirstArgv.mjs'
import getManifest from '../helpers/getManifest.mjs'
import getPackagePath from '../helpers/getPackagePath.mjs'
import getScopedPackageName from '../helpers/getScopedPackageName.mjs'
import outputJson from '../helpers/outputJson.mjs'
import pick from '../utils/pick.mjs'

const genPackage = async () => {
  const manifest = await getManifest('root')
  const packageName = getFirstArgv()
  const scopedPackageName = await getScopedPackageName(packageName)

  const dirPath = getPackagePath(packageName)
  const filePath = resolve(dirPath, 'package.json')

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
      build: 'node ../../scripts/build.mjs',
      lint: 'node ../../scripts/lint.mjs',
      version: 'node ../../scripts/version.mjs',
    },
    peerDependencies: {
      react: '>=17.*',
    },
    devDependencies: pick(manifest.dependencies, [
      '@storybook/react',
      '@types/react',
      'react',
    ]),
  }

  await outputJson(filePath, template)
  await execute('yarn')
}

export default genPackage
