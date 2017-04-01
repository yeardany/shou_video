/**
 * Created by SYM on 2017/3/20.
 */
var webpack = require("webpack");
var path = require('path');
module.exports = {
    entry: {
        a: "./public/javascripts/index.js",
        b: "./public/javascripts/admin.js"
    },
    output: {
        path: path.resolve(__dirname, "./public/dist"),
        filename: "js/[name].js"
    },
    module: {
        loaders: [
            {test: /.\less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /.\js$/, loader: "babel-loader", query: {presets: ['env']}, include: path.resolve(__dirname, "src")},
            {test: /.\html$/, loader: "html-loader"}
        ]
    }
}