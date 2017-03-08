const expressWinston = require('express-winston');
const logger = rr('util/logger');

module.exports = expressWinston.logger({
    transports: logger.loggers,
    statusLevels: {
        success: 'info',
        warn: 'warn',
        error: 'error'
    }
});
