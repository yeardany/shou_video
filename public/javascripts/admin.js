/**
 * Created by SYM on 2017/3/20.
 */
let Vue = require('../../node_modules/vue/dist/vue');

let app = new Vue({
    el: "#app",
    data: {
        percentage: 0,
        speed: ''
    }
});

let uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'upload',
    uptoken_url: './videos/upToken',
    get_new_uptoken: true,
    domain: 'http://on5gjg7q0.bkt.clouddn.com/',
    max_file_size: '100mb',
    max_retries: 1,
    chunk_size: '10mb',
    auto_start: true,
    unique_names: true,
    init: {
        'FilesAdded': function (up, files) {
            plupload.each(files, function (file) {
                console.log(file);
            });
        },
        'BeforeUpload': function (up, file) {
            // 每个文件上传前，处理相关的事情
            console.log(up);
            console.log(file);
        },
        'UploadProgress': function (up, file) {
            // 每个文件上传时，处理相关的事情
            let chunk_size = plupload.parseSize(this.getOption('chunk_size'));
            console.log(chunk_size);
            app.speed = Math.round(file.speed / 1024) + 'KB/S';
            app.percentage = file.percent;
        },
        'FileUploaded': function (up, file, info) {
            let domain = up.getOption('domain');
            let res = $.parseJSON(info);
            let sourceLink = domain + "/" + res.key;
            console.log(sourceLink);

        },
        'Error': function (up, err, errTip) {
            //上传出错时，处理相关的事情
            console.log()
        },
        'UploadComplete': function () {
            //队列文件处理完毕后，处理相关的事情
        }
    }
});


