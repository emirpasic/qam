const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('About Page');
});

module.exports = router;
