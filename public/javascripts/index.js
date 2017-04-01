/**
 * Created by SYM on 2017/3/20.
 */
let Vue = require('../../node_modules/vue/dist/vue');
let axios = require('../../node_modules/axios/dist/axios.min');
let app = new Vue({
    el: "#app",
    data: {
        videos: [],
        videoWidth: document.getElementById('videoWrap').offsetWidth - 30
    },
    mounted: function () {
        let self = this;
        axios.post('/videos/list').then(function (response) {
            //console.log(JSON.stringify(response["data"]));
            self.videos = response["data"];
        }).catch(function (response) {
            console.log(response);
        });
    }
})
