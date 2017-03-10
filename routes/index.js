const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index/index', { title: 'Home' });
});

module.exports = router;
