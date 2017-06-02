/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

let axios = require('../../node_modules/axios/dist/axios.min');
let auitoast = require('../../public/lib/aui-toast');
let url = require('../configUrl');

function category() {
    return {
        props: ['page', 'width', 'players'],
        template: '\
    <div v-show="page===\'category\'">\
        <div class="aui-content aui-margin-b-15">\
            <ul class="aui-list aui-media-list">\
                <li class="aui-list-item" v-for="category in categories">\
                    <div class="aui-list-item-inner">\
                        <div class="aui-row">\
                            <div class="aui-col-xs-6" style="margin-right: 0.5rem;">\
                                <video :id="category.index" class="video-js" x-webkit-airplay="allow" webkit-playsinline :width="width/2">\
                                    <source :src="videoUrl"  type="video/mp4">\
                                </video>\
                            </div>\
                            <div class="introduce">\
                                <div class="aui-list-item-title">{{category.videoTitle}}</div>\
                                <p>{{category.videoIntroduce}}</p>\
                            </div>\
                        </div>\
                        <div class="episodes">\
                            <div>\
                                <table>\
                                    <tr>\
                                        <th v-for="episode in category.videoEpisodes">\
                                            <div @click="chooseVideo(category.index,episode.videoUrl)">\
                                                <span>第{{episode.videoEpisode}}集</span> \
                                                <span>{{episode.videoTime}} 更新</span>\
                                            </div>\
                                        </th>\
                                    </tr>\
                                </table>\
                            </div>\
                        </div>\
                    </div>\
                </li>\
            </ul>\
        </div>\
    </div>',
        data: function () {
            return {
                videoUrl: '',
                categoryDetail: [],
                idList: [],
                errCode: {
                    "1": "播放中断",
                    "2": "网路故障，加载失败",
                    "3": "浏览器不支持",
                    "4": "播放格式不支持",
                    "5": "视频解码失败",
                    "6": "请勿使用推流地址拉流",
                    "7": "拉流超时"
                }
            }
        },
        mounted: function () {
            let self = this;
            axios.get(url['categoryList']).then(function (response) {
                let categories = response["data"], i = 0;
                categories.forEach(function (e) {
                    let params = new URLSearchParams();
                    params.append('category', e['videoTitle']);
                    axios.post(url['categoryVideo'], params).then(function (response) {
                        self.categoryDetail.push({
                            'index': 'cV' + i,
                            'videoTitle': e['videoTitle'],
                            'videoIntroduce': e['videoIntroduce'],
                            'videoEpisodes': response['data'].sort(self.sequence)
                        });
                        self.idList.push('cV' + i);
                        self.videoUrl = self.categoryDetail[0]['videoEpisodes'][0]['videoUrl'];
                        i++;
                    });
                });
            }).catch(function (response) {
                console.log(response);
            });
        },
        computed: {
            categories: function () {
                return this.categoryDetail
            }
        },
        methods: {
            chooseVideo: function (index, url) {
                let app = this;
                let self = this.players[index.substr(2)]['object'];
                if (!self.setDataSource({type: "video/mp4", src: url})) self.play();
                self.onError(function (err) {
                    if (err) self.pause();
                    toast.fail({title: app.errCode[err.errCode] || '播放错误'});
                });
            },
            sequence: function (x, y,) {
                return y.videoEpisode - x.videoEpisode
            }
        }
    }
}

let toast = new auiToast();
module.exports = category();