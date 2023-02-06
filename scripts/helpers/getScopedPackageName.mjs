import getManifest from './getManifest.mjs'
import getPackageScope from './getPackageScope.mjs'

const getScopedPackageName = async (packageName) => {
  const { name: rootPackageName } = await getManifest('root')

  const scope = getPackageScope(rootPackageName)

  return `${scope}/${packageName}`
}

export default getScopedPackageName
