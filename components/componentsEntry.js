/**
 * Created by SYM on 2017/5/11.
 */
"use strict";

let home = require('./home/home');
let category = require('./category/category');
let person = require('./person/person');

module.exports = {
    pageHome: function () {
        return home;
    },
    pageCategory: function () {
        return category;
    },
    pagePerson: function () {
        return person;
    }
};