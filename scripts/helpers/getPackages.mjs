import getManifest from './getManifest.mjs'
import getPackageName from './getPackageName.mjs'

const getPackages = async (scopedPackageName, visitedPackages = []) => {
  const manifest = await getManifest(getPackageName(scopedPackageName))

  const dependencies = {
    ...manifest.dependencies,
    ...manifest.peerDependencies,
    ...manifest.devDependencies,
  }

  const dependentPackages = Object.keys(dependencies).filter((dependency) => {
    return dependencies[dependency].startsWith('workspace:')
  })

  dependentPackages.forEach((dependentPackage) => {
    if (dependentPackage === scopedPackageName) {
      throw new Error(`${scopedPackageName} depends on itself`)
    }

    visitedPackages.forEach((visitedPackage) => {
      if (visitedPackage === dependentPackage) {
        throw new Error(
          `cyclic dependency detected:\n${visitedPackages.join(
            ' -> '
          )} -> ${scopedPackageName} -> ${dependentPackage}`
        )
      }
    })
  })

  const packages = await Promise.all(
    dependentPackages.map((dependentPackage) => {
      return getPackages(
        dependentPackage,
        visitedPackages.concat(scopedPackageName)
      )
    })
  )

  return Array.from(new Set(packages.flat().concat(scopedPackageName)))
}

export default getPackages
