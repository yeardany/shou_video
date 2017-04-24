/**
 * Created by SYM on 2017/3/20.
 */
let userModel = require('../modles/users_model');

module.exports = {

    findAllUsers: function (req, res, next) {
        userModel.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err).end();
            } else {
                console.log("查询用户表成功");
                console.log(result);
                res.send(result).end();
            }
        })
    },

    findOneUser: function (req, res, next) {
        let username = req.body.username || '';
        let password = req.body.password || '';
        userModel.findOne({"userName": username, "passWord": password}, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err).end();
            } else {
                try {
                    if (result.userName === username)
                        res.json({'res': '200'}).end();
                } catch (err) {
                    res.json({'res': '400'}).end();
                }
            }
        })
    },

    insertOneUser: function (req, res, next) {
        let username = req.body.username || '';
        let password = req.body.password || '';

        console.log("username:" + username + ",password:" + password);

        let newUser = new userModel({
            userName: username,
            passWord: password
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.json({'res': '500'}).end();
            } else {
                res.json({'res': "300"}).end();
            }
        })
    }

};