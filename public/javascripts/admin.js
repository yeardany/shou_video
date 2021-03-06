/**
 * Created by SYM on 2017/3/20.
 */
"use strict";

let Vue = require('../../node_modules/vue/dist/vue');
let axios = require('../../node_modules/axios/dist/axios.min');
let url = require('../../components/configUrl');

// const isDebug_mode = process.env.NODE_ENV !== 'production';
// Vue.config.debug = isDebug_mode;
// Vue.config.devtools = isDebug_mode;
// Vue.config.productionTip = isDebug_mode;

let app = new Vue({
    el: "#app",
    data: {
        percentage: 0,
        speed: '',
        users: []
    },
    mounted: function () {
        // let self = this;
        // getUser:  {
        //     axios.get(['']).then(function (res) {
        //         //console.log(JSON.stringify(res.data));
        //         self.users = res.data;
        //     });
        // }
    }
});

let uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'upload',
    uptoken_url: url['videoToken'],
    get_new_uptoken: true,
    domain: 'http://videos.evercx.me',
    max_file_size: '6144mb',
    max_retries: 1,
    chunk_size: '10mb',
    auto_start: true,
    unique_names: true,
    init: {
        'BeforeUpload': function (up, file) {
            // 每个文件上传前，处理相关的事情
            let videoTitle = document.getElementById('videoTitle');
            let videoEpisode = document.getElementById('videoEpisode');

            if (videoTitle.value === undefined || videoTitle.value === '' || videoTitle.value === null) {
                alert('请输入文件名称');
                location.reload();
            } else {
                let params = new URLSearchParams();
                params.append('videoTitle', videoTitle.value);
                params.append('videoEpisode', videoEpisode.value);
                axios.post(url['videoTitle'], params);
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
                let d = new Date();
                let time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                let data = {
                    "videoUrl": sourceLink,
                    "videoTime": time
                };
                let params = {
                    'category': document.getElementById('videoTitle').value,
                    'introduce': document.getElementById('videoIntroduce').value
                };

                axios.post(url['categoryExist'], {"category": document.getElementById('videoTitle').value}).then(function (res) {
                    if (res['data']['res'] === '200') {
                        return axios.post(url['videoUrl'], data)
                    } else if (res['data']['res'] === '400') {
                        return axios.post(url['categoryCreate'], params);
                    }
                }).then(function (res) {
                    if (res.data.res === '200') {
                        alert(res.data.msg);
                    } else if (res.data.res === '300') {
                        return axios.post(url['videoUrl'], data)
                    }
                    location.reload();
                }).then(function (res) {
                    if (res.data.res === '200') alert(res.data.msg);
                    location.reload();
                }).catch(function (err) {
                    console.log(err)
                });
            }
        }
    }
});


