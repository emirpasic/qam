const os = require('os');
const deepFreeze = require('../util/object').deepFreeze;
const version = require('../package.json').version;

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 4000;

// Defaults
const config = {
    environment: environment,
    version,
    server: {
        name: 'nwb',
        port: port,
        cluster: {
            workers: os.cpus().length
        }
    }
};

// Environment specific
switch (environment) {
    case 'test':
        config.logger = { // Logger settings
            level: 'info', // Severity level threshold
            console: false, // Log to console
            file: { // Log to file if set
                path: `log/${config.environment}.log`, // Log file path
                maxSize: 10 * 1024 * 1024 // Max log file size in bytes
            }
        };
        break;

    case 'local':
        config.server.cluster = false; // Single process in local
        config.logger = {
            level: 'debug',
            console: true,
            file: {
                path: `log/${config.environment}.log`,
                maxSize: 2 * 1024 * 1024
            }
        };
        break;

    case 'development':
        config.logger = {
            level: 'info',
            console: false,
            file: {
                path: `log/${config.environment}.log`,
                maxSize: 50 * 1024 * 1024
            }
        };
        break;

    case 'production':
        config.logger = {
            level: 'info',
            console: false,
            file: {
                path: `log/${config.environment}.log`,
                maxSize: 50 * 1024 * 1024
            }
        };
        config.less = {
            force: false,
            debug: false,
            once: true
        };
        break;

    default:
        console.error('NODE_ENV environment variable invalid or not set');
        process.exit(1);
}

deepFreeze(config);

module.exports = config;
