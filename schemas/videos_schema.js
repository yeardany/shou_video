/**
 * Created by SYM on 2017/3/20.
 */
let mongoose = require('mongoose');
let videoSchema = new mongoose.Schema({
    videoName: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    videoTime: {
        type: String,
        require: true
    }
});

module.exports = videoSchema;