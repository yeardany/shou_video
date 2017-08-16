/**
 * Created by SYM on 2017/5/14.
 */
let categoryModel = require('../modles/categories_model');
let AV = require('leanengine');

let query = new AV.Query('categories');

module.exports = {

    getCategoryList: function (req, res, next) {
        query.find().then(function (results) {
            console.log("查询分类表成功");
            res.send(results);
        }, function (err) {
            if (err.code === 101) {
                res.send([]);
            } else {
                next(err);
            }
        }).catch(next);
        // categoryModel.find({}, function (err, result) {
        //     if (err) {
        //         console.log(err);
        //         res.send(err).end();
        //     } else {
        //         console.log("查询分类表成功");
        //         res.send(result).end();
        //     }
        // })
    },

    getCategoryExist: function (req, res, next) {
        let category = req.body.category || '';
        categoryModel.findOne({"videoTitle": category}, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err).end();
            } else {
                try {
                    if (result.videoTitle === category)
                        res.json({'res': '200'}).end();
                } catch (err) {
                    res.json({'res': '400'}).end();
                }
            }
        })
    },

    putCategoryCreate: function (req, res, next) {
        let category = req.body.category || '';
        let introduce = req.body.introduce || '';

        let newCategory = new categoryModel({
            videoTitle: category,
            videoIntroduce: introduce
        });

        newCategory.save(function (err) {
            if (err) {
                console.log(err);
                res.json({'res': '500'}).end();
            } else {
                res.json({'res': "300"}).end();
            }
        })
    }

};