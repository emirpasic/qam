const logger = require('../util/logger');

module.exports = (req, res, next) => {
    const startTime = new Date();
    const originalEnd = res.end;

    res.end = (chunk, encoding) => {
        res.end = originalEnd;
        res.end(chunk, encoding);

        const responseTime = new Date() - startTime;
        const url = req.originalUrl || req.url;
        const msg = `${req.method} ${url} ${res.statusCode} ${responseTime}ms ${JSON.stringify(req.headers)}`;

        let logLevel = 'info';
        if (res.statusCode >= 400) logLevel = 'warn';
        if (res.statusCode >= 500) logLevel = 'error';
        logger[logLevel](msg);
    };

    next();
};
