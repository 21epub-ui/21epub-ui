import createInstance from './helpers/createInstance'

export * from './index.types'

export const request = createInstance()

export { HTTPError } from './modules/ky/source/errors/HTTPError'
export { TimeoutError } from './modules/ky/source/errors/TimeoutError'
