const express = require('express');
const path = require('path');
const cluster = require('cluster');
const config = require('./server-config');
const logger = require('./util/logger');
const bodyParser = require('body-parser');

// Starts a single worker
const startWorker = () => {
    const app = express();

    // Configuration
    app.enable('trust proxy');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // View engine
    app.set('views', path.join(__dirname, 'view'));
    app.set('view engine', 'ejs');

    // Middleware
    app.use(require('./middleware/request-logger'));
    app.use(require('./middleware/obscure-header'));
    app.use(require('cors')());

    // Public static folder
    app.use(express.static(path.join(__dirname, 'public')));

    // Routes
    const routes = require(`./route/route`);
    routes(app);

    app.listen(config.server.port, () => {
        logger.info(`Server listening on port ${config.server.port} (pid: ${process.pid}) (node: ${process.version})`);
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
