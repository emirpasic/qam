const express = require('express');
const path = require('path');
const cluster = require('cluster');
const config = require('./config/config');
const logger = require('./util/logger');
const routes = require('./routes/routes');

// Starts a single worker
const startWorker = () => {
    const app = express();
    app.locals.version = config.version;

    // View engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware
    app.use(require('./middleware/request-logger'));
    app.use(require('./middleware/obscure-header'));
    app.use(require('cors')());

    // Routes
    routes(app);

    app.listen(config.server.port, () => {
        logger.info(`Server listening on port ${config.server.port} (pid: ${process.pid})`);
    });
};

// Starts a cluster with multiple workers
const startCluster = () => {
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
};

if (config.server.cluster && cluster.isMaster) {
    startCluster();
} else {
    startWorker();
}
