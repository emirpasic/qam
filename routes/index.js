const router = require('express').Router();
const synonyms = require('../util/synonym');

router.get('/', (req, res) => {
    res.render('index/index');
});

router.post('/synonym', (req, res) => {
    synonyms.addSynonyms(req.body);
    res.json({});
});

router.get('/synonym', (req, res) => {
    res.json(synonyms.getSynonyms(req.query.word));
});

module.exports = router;
