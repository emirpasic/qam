module.exports = (req, res, next) => {
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
