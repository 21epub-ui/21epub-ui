type JsonValue = string | number | boolean | null | JsonObject | JsonArray

interface JsonObject {
  [index: string]: JsonValue
}

type JsonArray = JsonValue[]

const isValidJson = (value: unknown): value is JsonValue => {
  if (value === null) return true

  const type = typeof value

  if (type === 'undefined') return false

  if (type === 'string' || type === 'number' || type === 'boolean') return true

  if (type !== 'object') return false

  if (Array.isArray(value)) return true

  const prototype = Object.getPrototypeOf(value)

  return prototype === null || prototype === Object.prototype
}

export default isValidJson
