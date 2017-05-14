/**
 * Created by SYM on 2017/5/11.
 */
let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
    videoTitle: {
        type: String,
        require: true
    },
    videoIntroduce: {
        type: String,
        require: true
    }
});

module.exports = categorySchema;