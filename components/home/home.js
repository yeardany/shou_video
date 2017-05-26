/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

let axios = require('../../node_modules/axios/dist/axios.min');
let url = require('../configUrl');

function home() {
    return {
        props: ['page', 'width'],
        template: '\
    <div v-show="page===\'home\'" class="homeWrapper">\
        <div class="aui-card-list" v-for="item in videos">\
            <div class="aui-card-list-header">{{item.videoTitle}}{{item.videoEpisode}}</div>\
                <div class="aui-card-list-content">\
                    <video :src="item.videoUrl" controls="controls" preload="none" style="margin-left: 15px" :width="width"></video>\
                </div>\
            <div class="aui-card-list-footer">发表于 {{item.videoTime}}</div>\
        </div>\
    </div>',
        data: function () {
            return {
                videos: []
            }
        },
        mounted: function () {
            let self = this;
            axios.get(url['videoList']).then(function (response) {
                self.videos = response["data"];
            }).catch(function (response) {
                console.log(response);
            });
        }
    }
}

module.exports = home();
