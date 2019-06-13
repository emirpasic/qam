const config = require('../server-config');

module.exports = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('Server', config.server.name);
    return next();
};
