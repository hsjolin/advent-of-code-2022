"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringReader_1 = require("../utils/stringReader");
var utils_1 = require("../utils/utils");
utils_1.Utils.lineReader("src/06/input.txt", /(.*)/, function (match) {
    var string = new stringReader_1.default(match[1]);
    var _loop_1 = function () {
        var fourCharString = new stringReader_1.default(string.read(4));
        if (string.isEOL()) {
            return "break";
        }
        fourCharString.readUntil(function (c) { return fourCharString.string.lastIndexOf(c) > fourCharString.position; });
        if (fourCharString.isEOL()) {
            return "break";
        }
        string.position -= 3;
    };
    while (true) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return string.position;
}, function (result) {
    console.log(result[0]);
    console.log("Finished");
});
