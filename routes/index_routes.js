let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/admin', function (req, res, next) {
    res.render('admin');
});

module.exports = router;
