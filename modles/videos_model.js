/**
 * Created by SYM on 2017/3/20.
 */
let mongoose = require('mongoose');
let videosSchema = require('../schemas/videos_schema');
let videosModel = mongoose.model('videos', videosSchema, 'videos');
module.exports = videosModel;