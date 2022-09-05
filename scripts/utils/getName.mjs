const getName = () => {
  const argv = process.argv.slice(2)

  return argv[0]
}

export default getName
