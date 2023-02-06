const filterDependencies = (manifest) => {
  const dependencies = Object.entries({
    ...manifest.dependencies,
    ...manifest.peerDependencies,
    ...manifest.devDependencies,
  })

  return dependencies
    .filter((dependency) => dependency.at(1).startsWith('workspace:'))
    .map((dependency) => dependency.at(0))
}

export default filterDependencies
