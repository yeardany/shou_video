"use strict";
let fs = require('fs'),
    path = require('path'),
    readline = require('readline'),
    out = process.stdout;

module.exports = function (key, kpath, stream) {

    let filePath = './public/videos/torrent-stream/' + kpath;

    let readStream = fs.createReadStream(filePath);
    let writeStream = fs.createWriteStream(path.join(__dirname, '../temp/', key));

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
        readline.cursorTo(process.stdout, 0);
        out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
        if (passedLength < totalSize) {
            setTimeout(show, 500);
        } else {
            let endTime = Date.now();
            console.log();
            console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
        }
    }, 500);

};