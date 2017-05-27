/**
 * Created by SYM on 2017/5/14.
 */
let express = require('express');
let router = express.Router();
let categoryController = require('../controllers/category_controller');

router.get('/getCategoryList', categoryController.getCategoryList);
router.post('/putCategoryCreate', categoryController.putCategoryCreate);
router.post('/getCategoryExist', categoryController.getCategoryExist);

module.exports = router;