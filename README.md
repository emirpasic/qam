![qam logo](https://cloud.githubusercontent.com/assets/3115942/23819499/7e6e0f86-0607-11e7-9b7e-64649bf1ee3c.png)

Node.js Web Application Boilerplate.

Quick-start your backend and frontend with this boilerplate.

## Features

- Start the Node.js express server in single process or multi process mode
- Compile and bundle frontend Javascript (ECMAScript 6)
- Compile and bundle frontend CSS from LESS
- Logging
- Configurations
- Error handling
- CORS
- Automatic server restart and compilations during development

## Getting started

- Install [Node.js](https://nodejs.org/en/) v6
- Install yarn: ` npm install -g yarn `
- Install dependencies: ` yarn `
- Install gulp: ` npm install -g gulp `

## Running in development

- From shell: ` NODE_ENV=development gulp ` or just ` gulp `
- From WebStorm follow [these settings](https://cloud.githubusercontent.com/assets/3115942/23781962/105b8408-0551-11e7-8037-9fbbf348d73d.png)

## Running in production

- Compile your assets: ` gulp jsx:compile && gulp less:compile `
- Start server: ` NODE_ENV=production node app.js `

## Directory structure

- **assets** *private assets*
  - **jsx** *frontend javascript that will be compiled*
  - **less** *less files*
- **config** *configurations*
  - **config.js** *main configuration file*
- **middleware** *express middleware*
- **public** *public assets*
  - **css** *compiled css files*
  - **js** *compiled frontend javascript*
- **routes** *all routes*
  - **routes.js** *entry point for all routes*
- **util** *utility and helper functions*
- **views** *ejs files and templates*
- **app.js** *entry point of the application server*
- **gulpfile.js** *various gulp tasks*

## Technology stack (reasoning)

- [x] Node.js v6 (fast and battle-tested process based async architecture, ECMAScript 6)
- [x] Server side ECMAScript 6 (arrow functions, classes, template strings, spread, etc.)
- [x] yarn as packaging manager (faster and safer than npm and removes the need for shrinkwrap)
- [x] Express as web application framework (popular, fast, unopinionated, minimalist)
- [x] Logging with winston and winston-express
- [x] Configurations simply though Javascript
- [x] Routing natively with Express.Router (simple, thus fast)
- [x] EJS for templates
- [x] LESS for CSS (less is more)
- [x] Partial templates with EJS (simple and no magic from using other libraries)
- [x] Frontend side Javascript (ECMAScript 6) compilation and injection with babel and browserify
- [x] Watchers for automatic frontend Javascript builds in development
- [x] Watchers for automatic LESS compilations in development
- [x] Watchers for automatic server restarts in development with nodemon
