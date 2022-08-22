import type { RequestInstance, RequestOptions } from '../index.types'
import { requestMethods, stop } from '../modules/ky/source/core/constants'
import { Ky } from '../modules/ky/source/core/Ky'
import type { Input, Options } from '../modules/ky/source/types/options'
import { validateAndMerge } from '../modules/ky/source/utils/merge'
import type { Mutable } from '../modules/ky/source/utils/types'
import isValidJson from '../utils/isValidJson'
import parseResponse from '../utils/parseResponse'

const createInstance = (defaults?: RequestOptions) => {
  const parseOptions = (options?: RequestOptions) => {
    const newOptions = validateAndMerge(defaults, options)
    const body = newOptions.body

    return {
      ...newOptions,
      [isValidJson(body) ? 'json' : 'body']: body,
    } as Omit<RequestOptions, 'body'> & Pick<Options, 'body' | 'json'>
  }

  const instance: Partial<Mutable<RequestInstance>> = async (
    input: Input,
    options?: RequestOptions
  ) => {
    const newOptions = parseOptions(options)
    const response = await Ky.create(input, newOptions)

    return parseResponse(response, newOptions)
  }

  requestMethods.forEach((method) => {
    instance[method] = async (input: Input, options?: RequestOptions) => {
      const newOptions = parseOptions({ ...options, method })
      const response = await Ky.create(input, newOptions)

      return parseResponse(response, newOptions)
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
