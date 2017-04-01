/**
 * Created by SYM on 2017/3/20.
 */
let mongoose = require('mongoose');
let usersSchema = require('../schemas/users_schema');
let usersModel = mongoose.model('users', usersSchema, 'users');
module.exports = usersModel;