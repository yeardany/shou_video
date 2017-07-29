'use strict';
let axios = require('axios');
let qiniu = require('qiniu');

module.exports = function (key, path) {

    //配置上传token
    let mac = new qiniu.auth.digest.Mac('ta3AWG_OV18vbalFzxX2jPEMnUCNjhZXIDofrWZO', 'gnnyu4y0nsWgaej6xjX8-DTtnzVMca80ABqkbxam');
    let putPolicy = new qiniu.rs.PutPolicy({scope: 'shou'});
    let uploadToken = putPolicy.uploadToken(mac);

    //配置空间对应的机房
    let config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;
    config.useCdnDomain = true;

    //构造上传参数
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();

    //开始上传内容
    let localFile = './public/videos/torrent-stream/' + path + key;
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) throw respErr;
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    })
};