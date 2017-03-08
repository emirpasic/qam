const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('about/index', {title: 'Node.js website boilerplate'});
});

module.exports = router;
