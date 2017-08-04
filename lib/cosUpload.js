let COS = require('cos-nodejs-sdk-v5'),
    path = require('path');

module.exports = function (key, cPath, startTime) {

    // 创建实例
    let cos = new COS({
        AppId: '1251812724',
        SecretId: 'AKIDkQ1UqpQjW9h9a04YfdUAat8GGBziuL0W',
        SecretKey: 'ZBtZ9bw7bk2FH7b9dw31oPrAHDxaAapt'
    });

    // 分片上传
    cos.sliceUploadFile({
        Bucket: 'other',
        Region: 'cn-east',
        Key: key || '上传失败.txt',
        FilePath: cPath || path.join(__dirname, '../temp/', '上传失败.txt'),
    }, function (err, data) {
        if (err) console.log(err);
        else {
            let time = (Date.now() - (startTime || 0)) / 1000;
            console.log('上传完成，共耗时：' + time + '秒...');
            console.log(data);
        }
    })
};