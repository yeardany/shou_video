/**
 * Created by SYM on 2017/3/20.
 */
var mongoose = require('mongoose');
var userShema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    passWord: {
        type: String,
        require: true
    }
});
var videoSchema = new mongoose.Schema({
    videoName: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    }
});

module.exports = userShema;
module.exports = videoSchema;