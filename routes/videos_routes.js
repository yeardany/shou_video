let express = require('express');
let router = express.Router();
let videoController = require('../controllers/video_controller');
let userController = require('../controllers/user_controller');

router.post('/list', videoController.listVideos);
router.get('/upload', videoController.upToken);
router.post('/adduser', userController.insertOneUser);

module.exports = router;
