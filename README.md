![qam logo](https://cloud.githubusercontent.com/assets/3115942/23819499/7e6e0f86-0607-11e7-9b7e-64649bf1ee3c.png)

Node.js Web Application Framework

## Getting started

- Install [Node.js](https://nodejs.org/en/) v6
- Install yarn: ` npm install -g yarn `
- Install dependencies: ` yarn `
- Install gulp: ` npm install -g gulp `

## Running in development

- From shell: ` NODE_ENV=local gulp `
- From WebStorm with debugger follow [these settings](https://cloud.githubusercontent.com/assets/3115942/23781962/105b8408-0551-11e7-8037-9fbbf348d73d.png)

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
- **routes** *server router*
  - **routes.js** *entry point for all routes*
- **util** *utility and helper functions*
- **views** *ejs files and templates*
- **app.js** *entry point of the application server*
- **gulpfile.js** *various gulp tasks*

## Technology stack (reasoning)

- [x] Node.js v6 (fast and battle-tested process based async architecture, version 6 to support for ES6 Harmony)
- [x] Server side ECMAScript 6 (arrow functions, classes, template strings, spread, etc.)
- [x] yarn (faster and safer than npm and removes the need for shrinkwrap)
- [x] Express as web application framework (popular, fast, unopinionated, minimalist)
- [x] Node.js native cluster (more processes for more throughput)
- [x] Logging with winston and winston-express
- [x] Configurations simply though Javascript
- [x] Routing natively with Express (simple, thus fast)
- [x] EJS for templates (popular and advanced)
- [x] LESS for CSS (less is more)
- [x] Partial templates with EJS (simple and no magic from using other libraries)
- [ ] Error handling (40x, 50x)
- [x] Frontend side Javascript (ECMAScript 6) compilation and injection with babel and browserify
- [x] Watchers for automatic frontend Javascript builds in development
- [x] Watchers for automatic LESS compilations in development
- [x] Watchers for automatic server restarts in development with nodemon
- [ ] Caching (Nginx reverse proxy cache, S3, Memcached or files)
- [ ] ESLint (linting for better code readability)
