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

module.exports = router;
