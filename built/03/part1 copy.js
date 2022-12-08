"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
utils_1.Utils.lineReader("src/03/input.txt", /([A-Za-z]+)/, function (match) {
    var str = match[1];
    var part1 = str.substring(0, str.length / 2);
    var part2 = str.substring(str.length / 2);
    return calculatePriority(part1, part2);
}, function (result) {
    console.log(result, result.reduce(function (a, b) { return a + b; }, 0));
    console.log("Finished");
});
function calculatePriority(part1, part2) {
    for (var i = 0; i < part1.length; i++) {
        var match = part2.match(part1[i]);
        if (match) {
            return letters.indexOf(part1[i]) + 1;
        }
    }
}
