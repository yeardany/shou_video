var co = require('co'),
    OSS = require('ali-oss'),
    path = require('path');

var client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAIDTeazrzewWQA',
    accessKeySecret: 'r7Qi98WSllSKf8TroP4fEgvC6mQ2HM',
    bucket: 'kirs'
});
co(function* () {
    var result = yield client.multipartUpload('shou.mp4', path.join(__dirname, '../temp/', 'shou.mp4'), {
        progress: function* (p) {
            console.log('Progress: ' + p);
        }
    });
    console.log(result);
}).catch(function (err) {
    console.log(err);
});