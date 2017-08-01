let COS = require('cos-nodejs-sdk-v5'),
    path = require('path');

module.exports = function (key, cPath) {

    // 创建实例
    let cos = new COS({
        AppId: '1251812724',
        SecretId: 'AKIDkQ1UqpQjW9h9a04YfdUAat8GGBziuL0W',
        SecretKey: 'ZBtZ9bw7bk2FH7b9dw31oPrAHDxaAapt',
        onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
        }
    });

    // 分片上传
    cos.sliceUploadFile({
        Bucket: 'other',
        Region: 'cn-east',
        Key: key,
        FilePath: cPath,
    }, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    })
};