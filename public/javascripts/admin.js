/**
 * Created by SYM on 2017/3/20.
 */
let Vue = require('../../node_modules/vue/dist/vue');
let axios = require('../../node_modules/axios/dist/axios.min');

let app = new Vue({
    el: "#app",
    data: {
        percentage: 0,
        speed: '',
        users: []
    },
    mounted: function () {
        let self = this;
        getUser:  {
            axios.get('/users/getuser').then(function (res) {
                //console.log(JSON.stringify(res.data));
                self.users = res.data;
            });
        }
    }
});

let uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'upload',
    uptoken_url: './videos/uptoken',
    get_new_uptoken: true,
    domain: 'http://on5gjg7q0.bkt.clouddn.com/',
    max_file_size: '800mb',
    max_retries: 1,
    chunk_size: '10mb',
    auto_start: true,
    unique_names: true,
    init: {
        'BeforeUpload': function (up, file) {
            // 每个文件上传前，处理相关的事情
            let videoname = document.getElementById('videoname');
            if (videoname.value === undefined || videoname.value === '' || videoname.value === null) {
                alert('请输入文件名称');
                location.reload();
            } else {
                let data = {
                    "videoname": videoname.value,
                };
                axios.post('/videos/videoname', data);
            }
        },
        'UploadProgress': function (up, file) {
            // 每个文件上传时，处理相关的事情
            let chunk_size = plupload.parseSize(this.getOption('chunk_size'));
            app.speed = Math.round(file.speed / 1024) + 'KB/S';
            app.percentage = file.percent;
        },
        'FileUploaded': function (up, file, info) {
            let domain = up.getOption('domain');
            let res = JSON.parse(info);
            let sourceLink = domain + "/" + res.key;
            console.log(sourceLink);
            if (sourceLink.length > 0) {
                var d = new Date();
                var time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                let data = {
                    "videourl": sourceLink,
                    "videotime": time
                };
                axios.post('/videos/videourl', data).then(function (res) {
                    alert(res.data.msg);
                    location.reload();
                });
            }
        }
    }
});


