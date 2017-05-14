/**
 * Created by SYM on 2017/5/14.
 */

let mongoose = require('mongoose');
let categoriesSchema = require('../schemas/categories_schema');
let categoriesModel = mongoose.model('categories', categoriesSchema, 'categories');
module.exports = categoriesModel;