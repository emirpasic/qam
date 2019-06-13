const { deepFreeze } = require('./util/object');
const version = require('./package.json').version;

// Allow passing environment through NODE_ENV parameter (default: development)
const environment = process.env.NODE_ENV || 'development';

// Allow passing port through NODE_ENV parameter (default: 3000)
const port = process.env.PORT || 3000;

// Ensure this is never loaded in browser:
const isBrowser = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]';
if (isBrowser)
    throw new Error('Server configuration exposed in Browser');

// Defaults
let config = {
    environment,
    version,
    server: {
        name: 'qam',
        port,
    },
};

// Environment specific
switch (environment) {
    case 'development':

        config.rootURL = `http://localhost:${config.server.port}`;

        // Logger settings
        config.logger = {
            level: 'debug', // Severity level threshold
            console: true, // Log to console
            file: { // Log to file if set
                path: `log/${environment}.log`, // Log file path
                maxSize: 2 * 1024 * 1024, // Max log file size in bytes
            },
        };

        // Cluster mode (disabled)
        config.server.cluster = false;

        // Cache stores (memory, redis or memcached)

        config.cache = {
            store: 'memory',
        };

        // config.cache = {
        //     store: 'memcached',
        //     server: 'localhost:11211',
        //     options: {},
        // };

        // config.cache = {
        //     store: 'redis',
        //     host: 'localhost',
        //     port: 6379,
        // };

        break;

    case 'production':

        config.rootURL = 'https://example.com'; // Change to you domain!

        // Logger settings
        config.logger = {
            level: 'info',
            console: false,
            file: {
                path: `log/${environment}.log`,
                maxSize: 1024 * 1024 * 1024, // 1GB max log file size
            },
        };

        // Cluster mode (enabled)
        config.server.cluster = {
            workers: 8,
        };

        // Cache stores (memory, redis or memcached)

        config.cache = {
            store: 'memory',
        };

        // config.cache = {
        //     store: 'memcached',
        //     server: 'localhost:11211',
        //     options: {},
        // };

        // config.cache = {
        //     store: 'redis',
        //     host: 'localhost',
        //     port: 6379,
        // };

        break;

    default:
        throw new Error('NODE_ENV environment variable invalid or not set');
}

deepFreeze(config);

module.exports = config;