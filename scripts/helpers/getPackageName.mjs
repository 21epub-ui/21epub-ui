import getPackageConfig from './getPackageConfig.mjs'
import getName from './getName.mjs'
import getScope from './getScope.mjs'

const getPackageName = async () => {
  const { name: rootPackageName } = await getPackageConfig('root')

  const scope = getScope(rootPackageName)
  const name = getName()

  return `${scope}/${name}`
}

export default getPackageName
