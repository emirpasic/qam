# nwb
Node.js website boilerplate

Getting started:

- Install Node.js v6
- Install yarn `npm install -g yarn`
- Install dependencies `yarn`
- Install gulp `npm install -g gulp`

Running in development:

- From shell `gulp`
- From WebStorm with debugger ([settings](https://cloud.githubusercontent.com/assets/3115942/23781962/105b8408-0551-11e7-8037-9fbbf348d73d.png))

Running in production:

- TODO (clusters, compilations, etc.)

Technology stack (reasoning):

- [x] Node.js v6 (fast and battle-tested process based async architecture, version 6 to support for ES6 Harmony)
- [x] ECMAScript 6 (arrow functions, classes, template strings, spread, etc.)
- [x] yarn (faster and safer than npm and removes the need for shrinkwrap)
- [x] Express as web application framework (popular, fast, unopinionated, minimalist)
- [x] Node.js native cluster (more processes for more throughput using enterprise grade process management system)
- [x] Logging with winston and winston-express
- [x] Configurations simply though Javascript
- [x] Routing
- [x] EJS for templates (popular and advanced)
- [x] LESS for CSS (less is more)
- [x] Partial templates with EJS (simple and no magic from using other libraries)
- [ ] Error handling (40x, 50x)
- [ ] Javascript compilation and injection
- [x] Watchers for automatic frontend Javascript builds in development
- [x] Watchers for automatic LESS compilations in development
- [x] Watchers for automatic server restarts in development with nodemon
- [ ] Caching (Nginx reverse proxy cache, S3, Memcached or files)
- [ ] ESLint (linting for better code readability)
