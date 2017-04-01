/**
 * Created by SYM on 2017/4/1.
 */
let express = require('express');
let router = express.Router();
let userController = require('../controllers/user_controller');

router.post('/adduser', userController.insertOneUser);

module.exports = router;