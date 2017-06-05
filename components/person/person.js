/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

import axios from '../../node_modules/axios/dist/axios.min';
import url from '../configUrl';

function person() {
    return {
        props: ['page'],
        template: '\
    <div v-if="page===\'person\'">\
        <div class="aui-content aui-margin-b-15">\
            <yd-cell-group>\
                <yd-cell-item>\
                    <span slot="left">手机：</span>\
                    <yd-input slot="right" v-model="username" regex="mobile" placeholder="请输入手机号码"></yd-input>\
                </yd-cell-item>\
                <yd-cell-item>\
                    <span slot="left">密码：</span>\
                    <yd-input slot="right" type="password" v-model="password" placeholder="请输入密码"></yd-input>\
                </yd-cell-item>\
            </yd-cell-group>\
            <yd-button-group>\
                <yd-button size="large" type="primary" @click.native="operate(\'login\')">登录</yd-button>\
                <yd-button size="large" type="danger" @click.native="operate(\'register\')">注册</yd-button>\ \
            </yd-button-group>\
        </div>\
        <yd-button-group>\
            <yd-button size="large" type="hollow" @click.native="log = true">日志</yd-button>\
        </yd-button-group>\
        <yd-popup v-model="log" position="right" width="92%">\
            <yd-cell-group>\
                <yd-cell-item v-for="item in logs" :key="item.id">\
                    <span slot="left">{{item.content}}</span>\
                    <span slot="right">{{item.time}}</span>\
                </yd-cell-item>\
            </yd-cell-group>\
        </yd-popup>\
    </div>',
        data: function () {
            return {
                username: '',
                password: '',
                status: 'login',
                log: false,
                logs: [
                    {"id": "1", "content": "增加日志功能", "time": "6/5"},
                    {"id": "2", "content": "个人中心页面改用YDUI组件框架", "time": "6/4"},
                    {"id": "3", "content": "分类页点击集数直接播放,播放错误提示", "time": "6/2"},
                    {"id": "4", "content": "分类页视频选集功能", "time": "6/1"},
                    {"id": "5", "content": "页面加载状态,分类页使用网易云播放器", "time": "5/31"},
                    {"id": "6", "content": "首页更换使用网易云播放器", "time": "5/29"},
                    {"id": "7", "content": "代码压缩/兼容性,ES6转换", "time": "5/27"},
                    {"id": "8", "content": "代码重构/模块化,后台完善", "time": "5/15"},
                    {"id": "9", "content": "完善登录注册", "time": "4/24"},
                    {"id": "10", "content": "七牛上传完成,数据保存到腾讯云", "time": "4/2"},
                    {"id": "11", "content": "完成基本内容,待解决七牛上传报错", "time": "4/1"}
                ]
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
                    self.$dialog.toast({mes: '输入有误', timeout: 1500, icon: 'error'});
                    return
                }

                axios.post(url[id], params).then(function (response) {
                    if (response.data['res'] === '200') {
                        self.$dialog.toast({mes: '登录成功', timeout: 1500, icon: 'success'});
                    } else if (response.data['res'] === '400') {
                        self.$dialog.toast({mes: '登录失败', timeout: 1500, icon: 'error'});
                    } else if (response.data['res'] === '300') {
                        self.$dialog.toast({mes: '注册成功', timeout: 1500, icon: 'success'});
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

module.exports = person();