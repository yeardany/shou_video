/**
 * Created by SYM on 2017/3/20.
 */
"use strict";
// import '../stylesheets/aui.less';
let jq = require("expose-loader?$!jquery");
let Vue = require('../../node_modules/vue/dist/vue');
let auitab = require('../../public/lib/aui-tab');
let auitoast = require('../../public/lib/aui-toast');
let axios = require('../../node_modules/axios/dist/axios.min');

let app = new Vue({
    el: "#app",
    data: {
        videos: [],
        videoWidth: document.getElementById('videoWrap').offsetWidth - 30,
        username: '',
        password: '',
        status: 'login',
        url: {
            'video': '/videos/list',
            'login': '/users/checkuser',
            'register': '/users/adduser'
        },
        pages: ['home', 'courses'],
        page: 'home'
    },
    mounted: function () {
        localStorage.login === 'true' ? app.pages.push('center') : app.pages.push('person');
        let self = this;
        axios.get(self.url['video']).then(function (response) {
            self.videos = response["data"];
        }).catch(function (response) {
            console.log(response);
        });
    },
    methods: {
        reset: function () {
            this.username = "";
            this.password = "";
        },
        toggle: function () {
            this.status === 'register' ? this.status = 'login' : this.status = 'register';
        },
        operate: function (id) {
            let self = this;
            let reg = /^1(3|4|5|7|8)\d{9}$/;
            let params = new URLSearchParams();
            params.append('username', self.username);
            params.append('password', self.password);

            if (!reg.test(self.username)) {
                toast.fail({title: "输入有误"});
                return
            }

            axios.post(self.url[id], params).then(function (response) {
                if (response.data['res'] === '200') {
                    toast.success({title: "登录成功"});
                    localStorage.login = 'true';
                    app.page = app.pages.push('center');
                } else if (response.data['res'] === '400') {
                    toast.fail({title: "登录失败"});
                } else if (response.data['res'] === '300') {
                    toast.success({title: "注册成功"});
                    self.username = "";
                    self.password = "";
                }
            }).catch(function (response) {
                console.log(response);
            });
        }
    }
});

// let apiready = function () {
//     api.parseTapmode();
// };

let tab = new auiTab({
    element: document.getElementById('footer')
}, function (ret) {
    if (ret) {
        console.log(app.pages[ret.index - 1]);
        app.page = app.pages[ret.index - 1];
    }
});

let toast = new auiToast();






