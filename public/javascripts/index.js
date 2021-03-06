/**
 * Created by SYM on 2017/3/20.
 */
"use strict";

// let jq = require("expose-loader?$!jquery");
import Vue from '../../node_modules/vue/dist/vue';
import component from '../../components/componentsEntry';
import YDUI from 'vue-ydui';
import '../lib/aui-tab';
import '../lib/aui-toast';

// const isDebug_mode = process.env.NODE_ENV !== 'production';
// Vue.config.debug = isDebug_mode;
// Vue.config.devtools = isDebug_mode;
// Vue.config.productionTip = isDebug_mode;
Vue.use(YDUI);

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
        maskShow: null,
        pages: ['home', 'category', 'person'],
        page: 'home',
        videoWidth: document.getElementById('app').offsetWidth - 30,
        players: []
    },
    components: {
        'page-home': component.pageHome(),
        'page-category': component.pageCategory(),
        'page-person': component.pagePerson()
    },
    mounted: function () {
        this.maskShow = true;
        toast.loading({
            title: "加载中",
            duration: 2000
        });
    }
});

window.onload = function () {
    let idList = app.$refs['idList']['idList'];
    idList.forEach(function (d) {
        let myPlayer = neplayer(d, {
            "controls": true,
            "autoplay": false,
            "preload": "none",
            "poster": "../images/poster.png",
            "loop": false
        });
        app.players.push({"object": myPlayer});
    });
    app.maskShow = false;
    toast.hide();
};






