const deepFreeze = rr('util/object').deepFreeze;

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 4000;

// Defaults
const config = {
    environment: environment,
    server: {
        name: 'nwb',
        port: port
    }
};

// Environment specific
switch (environment) {
    case 'test':
        config.logger = {
            level: 'info',
            console: false,
            file: {
                path: `log/${config.environment}.log`,
                maxSize: 10 * 1024 * 1024
            }
        };
        break;

    case 'local':
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
        break;

    default:
        console.error('NODE_ENV environment variable invalid or not set');
        process.exit(1);
}

deepFreeze(config);

module.exports = config;
