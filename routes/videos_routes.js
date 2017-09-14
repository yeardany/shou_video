/**
 * Created by SYM on 2017/3/20.
 */
let express = require('express');
let router = express.Router();
let videoController = require('../controllers/video_controller');

router.get('/getVideoList', videoController.getVideoList);
router.get('/getVideoToken', videoController.getVideoToken);
router.post('/getCategoryVideo', videoController.getCategoryVideo);
router.post('/putVideoTitle', videoController.putVideoTitle);
router.post('/putVideoUrl', videoController.putVideoUrl);
router.get('/config', function (req, res, next) {
    res.json({
        "localAddress": "127.0.0.1",
        "localPort": 1080,
        "serverAddress": "rammy.herokuapp.com",
        "serverPort": 80,
        "password": "963747",
        "method": "aes-256-cfb"
    })
});

module.exports = router;
