const filterDependencies = (packageConfig) => {
  const dependencies = Object.entries({
    ...packageConfig.dependencies,
    ...packageConfig.peerDependencies,
    ...packageConfig.devDependencies,
  })

  return dependencies
    .filter((dependency) => dependency.at(1).startsWith('workspace:'))
    .map((dependency) => dependency.at(0))
}

export default filterDependencies
