const config = require('../../server-config');
const logger = require('../logger');

let cache;
switch (config.cache.store) {
    case 'memory':
        cache = require('./memory');
        logger.info('Initialized cache store: memory');
        break;
    case 'memcached':
        cache = require('./memcached');
        logger.info('Initialized cache store: memcached');
        break;
    case 'redis':
        cache = require('./redis');
        logger.info('Initialized cache store: redis');
        break;
    default:
        throw new Error('Undefined cache store');
}

module.exports = cache;
