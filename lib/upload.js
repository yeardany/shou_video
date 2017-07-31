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
    let putExtra = new qiniu.resume_up.PutExtra();
    let localFile = './public/videos/torrent-stream/' + path;
    let resumeUploader = new qiniu.resume_up.ResumeUploader(config);

    // 扩展参数
    putExtra.fname = key;

    // 指定断点记录文件，下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
    putExtra.resumeRecordFile = './public/videos/progress.log';

    //开始上传内容
    resumeUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) console.log(respErr);
        if (respInfo.statusCode === 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
};