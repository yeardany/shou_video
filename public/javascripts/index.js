/**
 * Created by SYM on 2017/3/20.
 */
"use strict";
let Vue = require('../../node_modules/vue/dist/vue');
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
        }
    },
    mounted: function () {
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
        popup: function () {
            $.popup('.popup-about');
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
                $.toast('请输入正确的手机号码');
                return
            }

            axios.post(self.url[id], params).then(function (response) {
                if (response.data['res'] === '200') {
                    $.toast('登录成功');
                    self.username = "";
                    self.password = "";
                } else if (response.data['res'] === '400') {
                    $.toast('登录失败');
                } else if (response.data['res'] === '300') {
                    $.toast('注册成功');
                }
            }).catch(function (response) {
                console.log(response);
            });
        }
    }
});
