const dedent = (template) => {
  const templateArray = template.split('\n')

  if (templateArray[0] === '') templateArray.shift()

  if (templateArray.length === 0) return ''

  const minIndentSize = templateArray.reduce((prev, curr) => {
    const trimmedString = curr.trimStart()
    const indentSize = curr.length - trimmedString.length

    if (trimmedString === '') return prev

    return Math.min(prev, indentSize)
  }, Infinity)

  const index = Number.isFinite(minIndentSize) ? minIndentSize : 0

  return templateArray.map((value) => value.slice(index)).join('\n')
}

export default dedent
