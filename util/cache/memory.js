const cache = require('memory-cache');

function Cache() {
    // Cache memory-cache
}

Cache.prototype.get = key => {
    const value = cache.get(key);
    return value === null ? undefined : value;
};

Cache.prototype.set = (key, data, durationSeconds) => {
    cache.put(key, data, durationSeconds * 1000);
};

module.exports = new Cache();
