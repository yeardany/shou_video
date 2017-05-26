/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

let axios = require('../../node_modules/axios/dist/axios.min');
let url = require('../configUrl');

function category() {
    return {
        props: ['page', 'width'],
        template: '\
    <div v-show="page===\'category\'">\
        <div class="aui-content aui-margin-b-15">\
            <ul class="aui-list aui-media-list">\
                <li class="aui-list-item" v-for="category in categories">\
                    <div class="aui-list-item-inner">\
                        <div class="aui-row">\
                            <div class="aui-col-xs-6" style="margin-right: 0.5rem;">\
                                <video :src="videoUrl"\
                                controls="controls" :width="width/2"></video>\
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
                                        <th v-for="episode in category.videoepisodes">\
                                            <div @click="toggleVideo(episode.videoUrl)">\
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
                categoryDetail: []
            }
        },
        mounted: function () {
            let self = this;
            axios.get(url['categoryList']).then(function (response) {
                let categories = response["data"];
                categories.forEach(function (e) {
                    let params = new URLSearchParams();
                    params.append('category', e['videoTitle']);
                    axios.post(url['findVideos'], params).then(function (response) {
                        let detail = {
                            'videoTitle': e['videoTitle'],
                            'videoIntroduce': e['videoIntroduce'],
                            'videoepisodes': response['data'].sort(self.up)
                        };
                        self.categoryDetail.push(detail);
                    })
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
            toggleVideo: function (url) {
                this.videoUrl = url;
            },
            up: function (x, y,) {
                return y.videoEpisode - x.videoEpisode
            }

        }
    }
}

module.exports = category();