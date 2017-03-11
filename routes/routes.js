const express = require('express');
const path = require('path');

module.exports = (app) => {

    app.use('/', require('./index'));
    app.use('/about', require('./about'));

    // Public
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // Not found
    app.use(require('./error').error404);

    // Internal server error
    app.use(require('./error').error500);

};