/**
 * Created by SYM on 2017/3/20.
 */
"use strict";

// let jq = require("expose-loader?$!jquery");
let Vue = require('../../node_modules/vue/dist/vue');
let auitab = require('../../public/lib/aui-tab');
let component = require('../../components/componentsEntry');

// const isDebug_mode = process.env.NODE_ENV !== 'production';
// Vue.config.debug = isDebug_mode;
// Vue.config.devtools = isDebug_mode;
// Vue.config.productionTip = isDebug_mode;

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






