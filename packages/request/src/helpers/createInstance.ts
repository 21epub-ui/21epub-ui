import type { Request, RequestInstance, RequestOptions } from '../index.types'
import { requestMethods, stop } from '../modules/ky/source/core/constants'
import { Ky } from '../modules/ky/source/core/Ky'
import type { Input } from '../modules/ky/source/types/options'
import { validateAndMerge } from '../modules/ky/source/utils/merge'
import type { Mutable } from '../modules/ky/source/utils/types'
import isValidJson from '../utils/isValidJson'

const createInstance = (defaults?: RequestOptions) => {
  const instance: Partial<Mutable<RequestInstance>> & Request = (
    input: Input,
    options?: RequestOptions
  ) => {
    const { body, ...mergedOptions } = validateAndMerge(defaults, options)

    return Ky.create(input, {
      ...mergedOptions,
      [isValidJson(body) ? 'json' : 'body']: body,
    })
  }

  requestMethods.forEach((method) => {
    instance[method] = (input: Input, options?: RequestOptions) => {
      return instance(input, { ...options, method })
    }
  })

  instance.create = (newDefaults) => {
    return createInstance(validateAndMerge(newDefaults))
  }
  instance.extend = (newDefaults) => {
    return createInstance(validateAndMerge(defaults, newDefaults))
  }
  instance.stop = stop

  return instance as RequestInstance
}

export default createInstance
