"use strict";
let fs = require('fs'),
    path = require('path'),
    readline = require('readline'),
    upload = require('./cosUpload'),
    out = process.stdout,
    writeStream = null;

module.exports = function (key, kPath) {

    let filePath = './public/videos/torrent-stream/' + kPath;
    let copyPath = path.join(__dirname, '../temp/', key);

    let readStream = fs.createReadStream(filePath);
    if (!fs.existsSync(copyPath)) writeStream = fs.createWriteStream(copyPath)
    else {
        console.log('文件已经存在...');
        return;
    }

    let totalSize = fs.statSync(filePath).size;
    let passedLength = 0;
    let lastSize = 0;
    let startTime = Date.now();

    readStream.on('data', function (chunk) {

        passedLength += chunk.length;

        if (writeStream.write(chunk) === false) {
            readStream.pause();
        }
    });

    readStream.on('end', function () {
        writeStream.end();
    });

    writeStream.on('drain', function () {
        readStream.resume();
    });

    setTimeout(function show() {
        let percent = Math.ceil((passedLength / totalSize) * 100);
        let size = Math.ceil(passedLength / 1000000);
        let diff = size - lastSize;
        lastSize = size;
        readline.clearLine(process.stdout);
        out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
        if (passedLength < totalSize) {
            setTimeout(show, 500);
        } else {
            let endTime = Date.now();
            console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
            console.log('开始上传...');
            upload(key, copyPath);
        }
    }, 500);
};