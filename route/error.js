const logger = require('../util/logger');

module.exports.error400 = (req, res, error) => {
    res.status(400);

    if (req.accepts('html')) {
        res.render('error', { error, title: 'Bad Request' });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: error || 'Bad Request' });
        return;
    }

    res.type('txt').send('Bad Request');
};

module.exports.error401 = (req, res, error) => {
    res.status(401);

    if (req.accepts('html')) {
        res.render('error', { error, title: 'Unauthorized' });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: error || 'Unauthorized' });
        return;
    }

    res.type('txt').send('Unauthorized');
};

module.exports.error403 = (req, res, error) => {
    res.status(403);

    if (req.accepts('html')) {
        res.render('error', { error, title: 'Forbidden' });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: error || 'Forbidden' });
        return;
    }

    res.type('txt').send('Forbidden');
};

module.exports.error404 = (req, res, error) => {
    res.status(404);

    const errorText = typeof error === 'string' ? error : 'Not found';

    if (req.accepts('html')) {
        res.render('error', { error: errorText, title: 'Not found', url: req.originalUrl });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: errorText, url: req.originalUrl });
        return;
    }

    res.type('txt').send(`Not found: ${req.originalUrl}`);
};

module.exports.error500 = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err.stack)
        logger.error(`${err.message}\n${err.stack}`);
    else
        logger.error(err.message);
    res.status(500);

    if (req.accepts('html')) {
        res.render('error', {
            error: 'Internal server error',
            title: 'Internal server error',
        });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: 'Internal server error' });
        return;
    }

    res.type('txt').send(`Internal server error`);
};
