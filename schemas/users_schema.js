/**
 * Created by SYM on 2017/3/20.
 */
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    passWord: {
        type: String,
        require: true
    }
});

module.exports = userSchema;