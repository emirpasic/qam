const express = require('express');
const lessMiddleware = require('less-middleware');
const path = require('path');

global.rr = (name) => require(path.join(__dirname, name));

const config = rr('config/config');
const logger = rr('util/logger');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(rr('middleware/request-logger'));
app.use(rr('middleware/obscure-header'));

// Routes
app.use('/', rr('routes/index'));
app.use('/about', rr('routes/about'));

// Public and private assets
public_path = path.join(__dirname, 'public');
assets_path = path.join(__dirname, 'assets');
app.use(lessMiddleware(assets_path, {
    dest: public_path,
    debug: config.less.debug,
    once: config.less.once,
    cacheFile: path.join(public_path, 'css', 'cache.json')
}));
app.use(express.static(public_path));

app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
});
