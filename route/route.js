const { error404, error500 } = require('./error');

module.exports = app => {

    // Routes
    app.use('/example', require('./example'));

    // Not found
    app.use(error404);

    // Internal server error
    app.use(error500);
};
