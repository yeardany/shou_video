/**
 * Created by SYM on 2017/4/1.
 */
let express = require('express');
let router = express.Router();
let userController = require('../controllers/user_controller');

router.get('/getUserList', userController.getUserList);
router.post('/userRegister', userController.userRegister);
router.post('/userLogin', userController.userLogin);

module.exports = router;