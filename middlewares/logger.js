/* eslint-disable no-console */

/**
 * Configurations
 */
const DEFAULT_CONFIG = {
  debug: process.env.DEBUG || false
}

/**
 * Log request and response
 */
module.exports = (opts) => {
  const options = Object.assign({}, DEFAULT_CONFIG, opts)

  return ({
    before: async (handler) => {
      if (options.debug) {
        console.debug('event', JSON.stringify(handler.event))
      }
    },
    after: async (handler) => {
      if (options.debug) {
        console.debug('response', JSON.stringify(handler.response))
      }
    },
    onError: async (handler) => {
      if (handler.error) {
        console.error('error', handler.error)
      }
      if (options.debug) {
        console.debug('response', JSON.stringify(handler.response))
      }
    }
  })
}

