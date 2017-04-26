/**
 * Created by SYM on 2017/3/20.
 */
let webpack = require("webpack");
let path = require('path');
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
            {test: require.resolve("jquery"), loader: "expose-loader?$"},
            {test: /.\less$/, loader: "style-loader!css-loader!less-loader"},
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9]+)?$/,
                loader: 'url-loader?limit=1000&name=ttf/[name].[ext]'
            },
            {test: /.\js$/, loader: "babel-loader", query: {presets: ['env']}, include: path.resolve(__dirname, "src")},
            {test: /.\html$/, loader: "html-loader"}
        ]
    }
};