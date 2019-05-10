const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./util/logger');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const app = express();
app.locals.version = config.version;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(require('./middleware/request-logger'));
app.use(require('cors')());
app.use(bodyParser.json());

// Routes
routes(app);

app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port} (pid: ${process.pid})`);
});
