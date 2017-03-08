const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index/index', {title: 'Node.js website boilerplate'});
});

module.exports = router;
