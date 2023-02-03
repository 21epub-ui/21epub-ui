import getPackageConfig from './getPackageConfig.mjs'
import getPackageScope from './getPackageScope.mjs'

const getScopedPackageName = async (packageName) => {
  const { name: rootPackageName } = await getPackageConfig('root')

  const scope = getPackageScope(rootPackageName)

  return `${scope}/${packageName}`
}

export default getScopedPackageName
