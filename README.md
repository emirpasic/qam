# nwb
Node.js website boilerplate

Getting started:

- Install Node.js v6
- Install yarn `npm install -g yarn`
- Install dependencies `yarn`
- Install StrongLoop PM `npm install -g strongloop`

Running:

- From shell `npm start`
- From WebStorm ([settings](https://cloud.githubusercontent.com/assets/3115942/23690339/290c0450-03c1-11e7-90cf-40bad11da836.png))
- Using StringLoop PM `cd .. && slc ctl env-set nwb NODE_ENV=local PORT=4000 && slc start nbw` (production environment)

Technology stack (reasoning):

- [x] Node.js v6 (battle-tested worker/process based async architecture, version 6 to support for ES6 Harmony)
- [x] ECMAScript 6 Harmony (because we like classes)
- [x] yarn (faster and safer than npm and removes the need for shrinkwrap)
- [x] Express as web application framework (popular, fast, unopinionated, minimalist)
- [x] IBM's StrongLoop PM for spawning multiple processes (more processes for more throughput using enterprise grade process management system)
- [x] Logging with winston and winston-express
- [x] Configurations
- [ ] Routing
- [ ] Error handling (40x, 50x)
- [ ] LESS for CSS (less is more)
- [ ] EJS for templates (popular and advanced)
- [ ] Automatic Javascript builds in development
- [ ] Automatic CSS builds in development
- [ ] Automatic server restarts in development
- [ ] ESLint (linting for better code readability)
