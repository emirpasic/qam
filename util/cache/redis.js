const redis = require('redis');
const config = require('../../server-config');
const logger = require('../logger');

function Cache() {
    const { host, port } = config.cache;
    if (!host) {
        throw new Error('Redis host not defined in config');
    }
    if (!port) {
        throw new Error('Redis port not defined in config');
    }
    this._cache = redis.createClient({ host, port });
}

Cache.prototype.get = function(key) {
    return new Promise((resolve, reject) => {
        this._cache.get(key, (err, data) => {
            if (err) {
                logger.error(err);
                reject();
            }
            if (data === null)
                data = undefined;
            resolve(data);
        });
    });
};

Cache.prototype.set = function(key, data, durationSeconds) {
    return new Promise((resolve, reject) => {
        this._cache.set(key, data, 'EX', durationSeconds, err => {
            if (err) {
                logger.error(err);
                reject();
            }
            resolve();
        });
    });
};

module.exports = new Cache();
