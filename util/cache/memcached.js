const Memcached = require('memcached');
const config = require('../../server-config');
const logger = require('../logger');

function Cache() {
    const { server, options } = config.cache;
    if (!server) {
        throw new Error('Memcached server not defined in config');
    }
    this._cache = new Memcached(server, options);
}

Cache.prototype.get = function(key) {
    return new Promise((resolve, reject) => {
        this._cache.get(key, (err, data) => {
            if (err) {
                logger.error(err);
                reject();
            }
            resolve(data);
        });
    });
};

Cache.prototype.set = function(key, data, durationSeconds) {
    return new Promise((resolve, reject) => {
        this._cache.set(key, data, durationSeconds, err => {
            if (err) {
                logger.error(err);
                reject();
            }
            resolve();
        });
    });
};

module.exports = new Cache();
