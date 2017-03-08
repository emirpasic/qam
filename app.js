global.rr = (name) => require(__dirname + '/' + name); // Root require

const config = rr('config/config');
const logger = rr('util/logger');
const express = require('express');

const app = express();
app.use(rr('middleware/request-logger'));
app.use(rr('middleware/obscure-header'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    throw new Error('test');
    res.send('Hello World!');
});

app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
});
