const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('about/index', { title: 'About' });
});

module.exports = router;
