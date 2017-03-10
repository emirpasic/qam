module.exports = (app) => {

    app.use('/', require('./index'));
    app.use('/about', require('./about'));

};