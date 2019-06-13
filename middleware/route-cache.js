// Adapted and modified from: https://github.com/Kuzmin/node-cache-middleware/blob/master/index.js

const cache = require('../util/cache/cache');

const DEFAULT_OPTIONS = {
    // Test function that returns true/false depending on if the request should
    // be cached or not, defaults to only caching GET requests
    testRequest: req => req.method === 'GET',

    // Cache key
    keyFunction: req => [
        req.originalUrl,
        req.header('accepts'),
        req.header('accept-encoding'),
    ].join('.').replace(/\s/g, '_'),
};

function evaluateOptions(durationSecondsOrOptions) {
    const options = {
        testRequest: DEFAULT_OPTIONS.testRequest,
        keyFunction: DEFAULT_OPTIONS.keyFunction,
    };

    if (Number.isInteger(durationSecondsOrOptions)) {
        // Allows only passing duration in seconds as single arguments
        options.durationSeconds = durationSecondsOrOptions;
    } else if (typeof durationSecondsOrOptions === 'object') {
        // Allows passing options as an object to override default options
        const { durationSeconds, testRequest, keyFunction } = durationSecondsOrOptions;
        if (durationSeconds)
            options.durationSeconds = durationSeconds;
        if (testRequest)
            options.testRequest = testRequest;
        if (keyFunction)
            options.keyFunction = keyFunction;
    } else {
        throw new Error('Invalid caching options');
    }

    if (options.durationSeconds === undefined)
        throw new Error('Need to set duration in seconds for route caching');

    return options;
}

function middleware(durationSecondsOrOptions) {
    const options = evaluateOptions(durationSecondsOrOptions);

    return async (req, res, next) => {

        if (!options.testRequest(req)) {
            next();
            return;
        }

        const cacheKey = options.keyFunction(req);

        const data = await cache.get(cacheKey);
        if (data) {
            res.send(data);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = body => {
                cache.set(cacheKey, body, options.durationSeconds);
                res.sendResponse(body);
            };
        }
        next();
    };
}

module.exports = middleware;
