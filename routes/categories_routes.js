/**
 * Created by SYM on 2017/5/14.
 */
let express = require('express');
let router = express.Router();
let categoryController = require('../controllers/category_controller');

router.post('/addCategory', categoryController.insertOneCategory);
router.post('/checkCategory', categoryController.findOneCategory);
router.get('/list', categoryController.findAllCategories);

module.exports = router;