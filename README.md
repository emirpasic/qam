# nwb
Node.js website boilerplate

Getting started:

- Install Node.js v6
- Install yarn `npm install -g yarn`
- Install dependencies `yarn`

Running:

- From shell `npm start`
- From WebStorm ([settings](https://cloud.githubusercontent.com/assets/3115942/23690339/290c0450-03c1-11e7-90cf-40bad11da836.png))

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
- [ ] Javascript compilation and injection
- [ ] Caching (Nginx reverse proxy cache, S3, Memcached or files)
- [ ] Automatic Javascript builds in development
- [x] Automatic CSS builds in development
- [ ] Automatic server restarts in development
- [ ] ESLint (linting for better code readability)
- [ ] Error handling (40x, 50x)
