/**
 * Created by SYM on 2017/3/20.
 */
"use strict";

// let jq = require("expose-loader?$!jquery");
let Vue = require('../../node_modules/vue/dist/vue');
let auitab = require('../lib/aui-tab');
let auitoast = require('../lib/aui-toast');
let component = require('../../components/componentsEntry');

// const isDebug_mode = process.env.NODE_ENV !== 'production';
// Vue.config.debug = isDebug_mode;
// Vue.config.devtools = isDebug_mode;
// Vue.config.productionTip = isDebug_mode;

let toast = new auiToast();

let tab = new auiTab({
    element: document.getElementById('footer')
}, function (ret) {
    if (ret) {
        console.log(app.pages[ret.index - 1]);
        app.page = app.pages[ret.index - 1];
    }
});

let app = new Vue({
    el: "#app",
    data: {
        pages: ['home', 'category', 'person'],
        page: 'home',
        videoWidth: document.getElementById('app').offsetWidth - 30
    },
    components: {
        'page-home': component.pageHome(),
        'page-category': component.pageCategory(),
        'page-person': component.pagePerson()
    },
    mounted: function () {
        toast.loading({
            title: "加载中",
            duration: 2000
        });
    }
});

window.onload = function () {
    let idList = app.$refs['idList']['idList'];
    idList.forEach(function (d) {
        neplayer(d, {
            "controls": true,
            "autoplay": true,
            "preload": "none",
            "poster": "../images/poster.png",
            "loop": false
        }, function () {
        });
    });
    toast.hide();
};






