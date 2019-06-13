const config = require('../server-config');
const winston = require('winston');
const util = require('util');

const loggers = [];

if (config.logger.console) {
    loggers.push(
        new winston.transports.Console({
            level: config.logger.level,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }));
}
if (config.logger.file) {
    loggers.push(
        new winston.transports.File({
            level: config.logger.level,
            filename: config.logger.file.path,
            maxsize: config.logger.file.maxSize,
            format: winston.format.simple(),
        }));
}

const logger = winston.createLogger({ transports: loggers });

// Override the default console logging
const formatArgs = args => {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
};
console.log = function() { // eslint-disable-line
    logger.info.apply(logger, formatArgs(arguments));
};
console.info = function() {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function() {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function() {
    logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function() { // eslint-disable-line
    logger.debug.apply(logger, formatArgs(arguments));
};

module.exports = logger;
module.exports.loggers = loggers;
