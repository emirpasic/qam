const deepFreeze = require('../util/object').deepFreeze;
const version = require('../package.json').version;

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

// Defaults
const config = {
    environment: environment,
    version,
    server: {
        port: port,
    }
};

// Environment specific
switch (environment) {

    case 'development':
        config.logger = {
            level: 'debug',
            console: true,
            file: {
                path: `log/${config.environment}.log`,
                maxSize: 2 * 1024 * 1024
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
