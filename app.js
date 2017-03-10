const express = require('express');
const lessMiddleware = require('less-middleware');
const path = require('path');
const cluster = require('cluster');
const config = require('./config/config');
const logger = require('./util/logger');
const routes = require('./routes/routes');

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
    const publicPath = path.join(__dirname, 'public');
    const assetsAssets = path.join(__dirname, 'assets');

    // View engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware
    app.use(require('./middleware/request-logger'));
    app.use(require('./middleware/obscure-header'));

    // Routes
    routes(app);

    // LESS
    app.use(lessMiddleware(assetsAssets, {
        dest: publicPath,
        debug: config.less.debug,
        once: config.less.once,
        cacheFile: path.join(publicPath, 'css', 'cache.json')
    }));

    // Public
    app.use(express.static(publicPath));

    app.listen(config.server.port, () => {
        logger.info(`Server listening on port ${config.server.port} (pid: ${process.pid})`);
    });
}
