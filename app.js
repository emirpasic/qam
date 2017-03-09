const express = require('express');
const lessMiddleware = require('less-middleware');
const path = require('path');
const cluster = require('cluster');
const config = require('./config/config');
const logger = require('./util/logger');

if (config.server.cluster && cluster.isMaster) {
    logger.info(`Master (pid: ${process.pid}) starting ${config.server.cluster.workers} workers`);

    for (let i = 0; i < config.server.cluster.workers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        logger.info(`Worker (pid: ${worker.process.pid}) started`);
    });

    cluster.on('exit', function(worker, code, signal) {
        logger.info(`Worker (pid: ${worker.process.pid}) died (code: ${code}, signal: ${signal})`);
        cluster.fork();
    });

} else {
    const app = express();

    // View engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware
    app.use(require('./middleware/request-logger'));
    app.use(require('./middleware/obscure-header'));

    // Routes
    app.use('/', require('./routes/index'));
    app.use('/about', require('./routes/about'));

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
        logger.info(`Server listening on port ${config.server.port} (pid: ${process.pid})`);
    });

}
