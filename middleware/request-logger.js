const expressWinston = require('express-winston');
const logger = require('../util/logger');

module.exports = expressWinston.logger({
    transports: logger.loggers,
    statusLevels: {
        success: 'info',
        warn: 'warn',
        error: 'error'
    }
});
