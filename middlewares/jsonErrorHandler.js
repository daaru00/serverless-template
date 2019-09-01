/* eslint-disable no-console */

/**
 * Configurations
 */
const DEFAULT_CONFIG = {
  logger: console.error,
  validationDetails: true
}

/**
 * Catch HTTP errors and format to JSON
 */
module.exports = (opts) => {
  const options = Object.assign({}, DEFAULT_CONFIG, opts)

  return ({
    onError: (handler, next) => {
      // check if it's a valid error request
      if (!handler.error.statusCode || !handler.error.message) {
        return next(handler.error)
      }

      // log error
      if (typeof options.logger === 'function') {
        options.logger(handler.error)
      }

      // check if it's a validation error
      if (handler.error.statusCode === 400 && handler.error.message === 'Event object failed validation') {
        // Build response
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            error: 'Bad Request',
            details: options.validationDetails === true ? handler.error.details : undefined
          })
        }
        return next()
      }

      // Build response
      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({
          error: handler.error.message
        })
      }
      return next()
    }
  })
}
