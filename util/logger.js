const config = require('../config/config');
const winston = require('winston');
const util = require('util');

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

// Override the default console logging
const formatArgs = (args) => {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
};
console.log = function() {
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
console.debug = function() {
    logger.debug.apply(logger, formatArgs(arguments));
};

module.exports = logger;
module.exports.loggers = loggers;
