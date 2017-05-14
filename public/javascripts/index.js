/**
 * Created by SYM on 2017/3/20.
 */
"use strict";
// import '../stylesheets/aui.less';
// let jq = require("expose-loader?$!jquery");
let Vue = require('../../node_modules/vue/dist/vue');
let auitab = require('../../public/lib/aui-tab');
let component = require('../../components/componentsEntry');

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






