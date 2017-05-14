/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

let axios = require('../../node_modules/axios/dist/axios.min');
let auitoast = require('../../public/lib/aui-toast');
let url = require('../configUrl');

function person() {
    return {
        props: ['page'],
        template: '\
    <div v-if="page===\'person\'">\
        <div class="aui-content aui-margin-b-15">\
            <ul class="aui-list aui-form-list">\
                <li class="aui-list-item">\
                    <div class="aui-list-item-inner">\
                        <div class="aui-list-item-label-icon">\
                            <i class="aui-iconfont aui-icon-mobile"></i>\
                        </div>\
                        <div class="aui-list-item-label">账号</div>\
                        <div class="aui-list-item-input">\
                            <input type="text" placeholder="输入账号" v-model="username">\
                        </div>\
                    </div>\
                </li>\
                <li class="aui-list-item">\
                    <div class="aui-list-item-inner">\
                        <div class="aui-list-item-label-icon">\
                            <i class="aui-iconfont aui-icon-lock"></i>\
                        </div>\
                        <div class="aui-list-item-label">密码</div>\
                        <div class="aui-list-item-input">\
                            <input type="password" placeholder="输入密码" v-model="password">\
                        </div>\
                    </div>\
                </li>\
                <li class="aui-list-item">\
                    <div class="aui-list-item-inner aui-list-item-center aui-list-item-btn">\
                        <div class="aui-btn aui-btn-danger aui-margin-l-5" @click="operate(\'login\')">登录</div>\
                        <div class="aui-btn aui-btn-success aui-margin-l-5" @click="operate(\'register\')">注册</div>\
                    </div>\
                </li>\
            </ul>\
        </div>\
    </div>',
        data: function () {
            return {
                username: '',
                password: '',
                status: 'login',
            }
        },
        mounted: function () {

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

                axios.post(url[id], params).then(function (response) {
                    if (response.data['res'] === '200') {
                        toast.success({title: "登录成功"});
                        // localStorage.login = 'true';
                        // app.page = app.pages.push('center');
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
        },
    }
}

let toast = new auiToast();
module.exports = person();