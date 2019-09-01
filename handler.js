const middy = require('middy')
const {
  validator, 
  httpHeaderNormalizer,
  httpContentNegotiation, 
  jsonBodyParser, 
  urlEncodeBodyParser 
} = require('middy/middlewares')
const createError = require('http-errors')

/**
 * Custom middlewares
 */
const middlewares = require('./middlewares')

/**
 * Input
 * 
 * JSON Schema doc: https://json-schema.org/understanding-json-schema/index.html
 */
const inputSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 2,
          maxLength: 50
        }
      },
      required: ['name']
    },
    headers: {}
  },
  required: ['body']
}

/**
 * Hello function handler
 * 
 * @param {*} event 
 */
const hello = async (event) => {

  // Get name
  const name = event.body.name

  // Error example
  if (name === 'error') {
    throw new createError.BadRequest(`Your name cannot be '${name}', it's not plausible`)
  }
  // 404 example
  if (name === '404') {
    throw new createError.NotFound('Your name cannot be found')
  }

  // Response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hi ${name}`
    })
  }
}

/**
 * Handlers
 */
module.exports = {
  hello: middy(hello)
    .use(httpHeaderNormalizer()) // Normalize headers
    .use(
      httpContentNegotiation({ // negotiate content with client
        availableLanguages: ['it', 'en'],
        availableMediaTypes: [
          'application/json'
        ]
      })
    )
    .use(jsonBodyParser()) // parse JSON request
    .use(urlEncodeBodyParser()) // parse x-www-form-urlencoded request
    .use(middlewares.jsonErrorHandler()) // catch HTTP errors
    .use( // validate request
      validator({
        inputSchema
      })
    )
    .use(middlewares.logger()) // Log request
}
