import filterDependencies from './filterDependencies.mjs'
import getPackageConfig from './getPackageConfig.mjs'

const findDependencies = async (scopedPackageName, dependencies) => {
  if (dependencies.includes(scopedPackageName)) return dependencies

  const packageConfig = await getPackageConfig(scopedPackageName)

  return filterDependencies(packageConfig).reduce(
    async (previousDependencies, currentScopedPackageName) => {
      return await findDependencies(
        currentScopedPackageName,
        await previousDependencies
      )
    },
    Promise.resolve(dependencies.concat(scopedPackageName))
  )
}

const getDependencies = async (scopedPackageName) => {
  const dependencies = await findDependencies(scopedPackageName, [])

  return dependencies.slice(1)
}

export default getDependencies
