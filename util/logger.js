const config = rr('config/config');
const winston = require('winston');

const loggers = [];

if (config.logger.console) {
    loggers.push(
        new winston.transports.Console({
            level: config.logger.level,
            colorize: true
        })
    );
}
if (config.logger.file) {
    loggers.push(
        new winston.transports.File({
            level: config.logger.level,
            filename: config.logger.file.path,
            maxsize: config.logger.file.maxSize,
            json: false
        })
    );
}

const logger = new (winston.Logger)({
    transports: loggers
});

module.exports = logger;
module.exports.loggers = loggers;
