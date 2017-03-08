global.rr = (name) => require(__dirname + '/' + name); // Root require

const config = rr('config/config');
const logger = rr('util/logger');
const express = require('express');
const path = require('path');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(rr('middleware/request-logger'));
app.use(rr('middleware/obscure-header'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', rr('routes/index'));
app.use('/about', rr('routes/about'));

app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
});
