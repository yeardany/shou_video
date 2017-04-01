/**
 * Created by SYM on 2017/3/20.
 */
let userModel = require('../modles/users_model');

module.exports = {

    findAllUsers: function(req,res,next){

        userModel.find({},function(err,result){

            if(err){

                console.log(err);
                res.send(err).end();
            }else{

                console.log("查询用户表成功");
                console.log(result);
                res.send(result).end();
            }
        })

    },
    insertOneUser: function (req,res,next) {

        var username = req.body.username || '';
        var pwd = req.body.password || '';

        var newUser = new userModel({

            userName: username,
            passWord: pwd
        });

        newUser.save(function(err){

            if(err){
                console.log(err);
                res.send(err).end();
            }else {
                console.log("保存用户成功");
                res.send({
                    msg : "保存用户成功",
                    code : "200"
                }).end();
            }

        })
    }
};