const getPackageScope = (scopedPackageName) => {
  const index = scopedPackageName.indexOf('/')

  if (scopedPackageName.at(0) !== '@' || index < 0) return scopedPackageName

  return scopedPackageName.slice(0, index)
}

export default getPackageScope
