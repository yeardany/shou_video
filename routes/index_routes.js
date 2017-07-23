let fs = require('fs');
var path = require('path');
let express = require('express');
let multipart = require('connect-multiparty');
let store = require('../lib/store');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/av', function (req, res, next) {
    res.render('index');
});

router.get('/admin', function (req, res, next) {
    res.render('admin');
});

router.post('/upload', multipart(), function (req, res, next) {
    let file = req.files && req.files.file;
    if (!file) {
        return res.send(500, 'file is missing');
    }
    store.add(file.path, function (err, infoHash) {
        if (err) {
            console.error(err);
            res.send(500, err);
        } else {
            res.send({infoHash: infoHash});
        }
        fs.unlink(file.path);
    });
});

module.exports = router;
