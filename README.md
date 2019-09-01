# Serverless Template

Serverless template for AWS projects with NodeJS as Lambda functions runtime.

## Getting Started

Use this template to bootstrap a new project
```bash
serverless create --template-url https://github.com/serverless/serverless/tree/master/ --path myService
```

Install NPM dependencies
```bash
npm install
```

## Deploy

Deploy Serverless project using `deploy` npm script
```bash
npm run deploy
```

## Remove

Destroy all resources created using `remove` npm script
```bash
npm run remove
```

## Development

[ESLint](https://eslint.org/) configurations are stored in `.eslintrc.js`, ignoring `node_modules` directory as described in  `.eslintignore`. IDE compatible rules are describe in `.editorconfig` in order to make easier to lint code.

[Middy](https://github.com/middyjs/middy) is used at runtime to better organize code using middleware pattern.

[http-errors](https://www.npmjs.com/package/http-errors) module is used to mange error types.
