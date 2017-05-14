/**
 * Created by SYM on 2017/3/20.
 */
let express = require('express');
let router = express.Router();
let videoController = require('../controllers/video_controller');

router.get('/list', videoController.listVideos);
router.get('/uptoken', videoController.upToken);
router.post('/findVideos', videoController.findVideos);
router.post('/videoname', videoController.addVideoName);
router.post('/videourl', videoController.addVideo);

module.exports = router;
