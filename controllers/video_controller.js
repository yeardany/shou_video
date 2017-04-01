/**
 * Created by SYM on 2017/3/20.
 */
let videoModels = require('../modles/videos_model');
let qiniu = require('qiniu');

//Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'ta3AWG_OV18vbalFzxX2jPEMnUCNjhZXIDofrWZO';
qiniu.conf.SECRET_KEY = 'gnnyu4y0nsWgaej6xjX8-DTtnzVMca80ABqkbxam';

let bucket = 'shou';//要上传的空间
let key = 'vue.png';//上传到七牛后保存的文件名

let video = {

    listVideos: function (req, res, next) {
        videoModels.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err).end();
            } else {
                console.log("查询用户表成功");
                //console.log(result);
                res.send(result);
            }
        });
    },

    //构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
    upToken: function (req, res, next) {
        let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
        //putPolicy.callbackUrl = 'http://your.domain.com/callback';
        //putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
        res.json({"uptoken": putPolicy.token()});
        console.log(putPolicy.token());
        return putPolicy.token();
    },

    //构造上传函数
    uploadVideo: function (req, res, next) {
        let token = video.upToken(bucket, key);//生成上传 Token
        let filePath = './public/videos/vue.js';//要上传文件的本地路径
        let extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, key, filePath, extra, function (err, ret) {
            if (!err) {
                //上传成功，返回下载地址
                let url = 'http://on5gjg7q0.bkt.clouddn.com/' + ret.key;
                let policy = new qiniu.rs.GetPolicy();
                //生成下载链接url
                let downloadUrl = policy.makeRequest(url);
                //打印下载的url
                res.send(downloadUrl);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
};

module.exports = video;