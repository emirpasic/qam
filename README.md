# qam

Node.js Web Application Framework

## Getting started

- Install Node.js v6
- Install yarn ```shell npm install -g yarn ```
- Install dependencies ```shell yarn ```
- Install gulp ```shell npm install -g gulp ```

## Running in development

- From shell ```shellNODE_ENV=local gulp ```
- From WebStorm with debugger ([settings](https://cloud.githubusercontent.com/assets/3115942/23781962/105b8408-0551-11e7-8037-9fbbf348d73d.png))

## Running in production

- Compile your assets (```shell gulp jsx:compile && gulp less:compile ```)
- Start server ```shell NODE_ENV=production node app.js ```

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
