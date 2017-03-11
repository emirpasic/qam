const logger = require('../util/logger');

module.exports.error404 = (req, res, next) => {
    res.status(404);

    if (req.accepts('html')) {
        res.render('error/404', { title: 'Not found', url: req.url });
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Not found', url: req.url });
        return;
    }

    res.type('txt').send(`Not found: ${req.url}`);
};

module.exports.error505 = (err, req, res, next) => {
    logger.error(err.message, err.stack);

    res.status(500);

    if (req.accepts('html')) {
        res.render('error/500', { title: 'Internal server error', url: req.url });
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Internal server error', url: req.url });
        return;
    }

    res.type('txt').send(`Internal server error: ${req.url}`);
};