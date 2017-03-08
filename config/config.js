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
        config.logger = { // Logger settings
            level: 'info', // Severity level threshold
            console: false, // Log to console
            file: { // Log to file if set
                path: `log/${config.environment}.log`, // Log file path
                maxSize: 10 * 1024 * 1024 // Max log file size in bytes
            }
        };
        config.less = { // LESS settings
            debug: false, // Show more verbose logging for less compilation
            once: true // Only recompile once after each server restart. Useful for reducing disk i/o on production.
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
        config.less = {
            debug: true,
            once: false
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
        config.less = {
            debug: false,
            once: true
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
