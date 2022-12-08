"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
utils_1.Utils.lineReader("src/04/input.txt", /(\d+)-(\d+),(\d+)-(\d+)/, function (match) {
    var number1 = parseInt(match[1]);
    var number2 = parseInt(match[2]);
    var number3 = parseInt(match[3]);
    var number4 = parseInt(match[4]);
    var numbers1 = utils_1.Utils.interval(number1, number2 + 1);
    var numbers2 = utils_1.Utils.interval(number3, number4 + 1);
    var pair = {
        numbers1: numbers1,
        numbers2: numbers2,
        overlaps: numbers1.length >= numbers2.length
            ? numbers2.filter(function (n) { return numbers1.includes(n); }).length > 0
            : numbers1.filter(function (n) { return numbers2.includes(n); }).length > 0,
    };
    return pair;
}, function (result) {
    console.log(result.filter(function (pair) { return pair.overlaps; }).length);
    console.log("Finished");
});
