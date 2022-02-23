const replacer = (letter) => letter.toUpperCase()

const kebabToPascal = (value) => {
  return value
    .split('-')
    .map((substring) => substring.replace(/^\w/, replacer))
    .join('')
}

export default kebabToPascal
