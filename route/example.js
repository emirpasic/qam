const express = require('express');
const router = express.Router();
const { error400, error403 } = require('./error');
const config = require('../server-config');
const logger = require('../util/logger');
const routeCache = require('../middleware/route-cache');
const cache = require('../util/cache/cache');

// Rendering a simple EJS view and passing down variables
router.get('/1', (req, res) => {
    res.render('example/1', { title: 'Example 1' });
});

// JSON parsing, validation and rendering.
// Simply check if password is equal to the server name from the server configuration.
router.post('/2', (req, res) => {
    const { password } = req.body;

    if (password === undefined) { // no password passed in JSON body
        error400(req, res, 'Missing password');
        return;
    }
    if (password !== config.server.name) {
        error403(req, res, 'Invalid password');
        return;
    }
    res.json({ ok: true });
});

// Logging example
router.get('/3', (req, res) => {
    logger.info('Info logged...');
    logger.error('Error logged...');
    res.json({ ok: true });
});

// Route caching example (cache the whole output from the endpoint through route-caching middleware)
router.get('/4', routeCache(5), (req, res) => {
    const lastCachedTime = new Date();
    res.render('example/4', { title: 'Example 4', lastCachedTime });
});

// Object caching example (cache individual variables within the cache store)
router.get('/5', async (req, res) => {
    let lastCachedTime = await cache.get('lastCachedTime');
    if (lastCachedTime === undefined) {
        await cache.set('lastCachedTime', new Date(), 5);
        lastCachedTime = await cache.get('lastCachedTime');
    }
    res.render('example/5', { title: 'Example 4', lastCachedTime });
});

// Error logging
router.get('/6', () => {
    throw new Error('test');
});

// Load CSS and JS into HTML
router.get('/7', (req, res) => {
    res.render('example/7');
});

module.exports = router;
