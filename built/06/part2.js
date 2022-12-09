"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringReader_1 = require("../utils/stringReader");
var utils_1 = require("../utils/utils");
var numberOfUniqueCharacters = 14;
utils_1.Utils.lineReader("src/06/input.txt", /(.*)/, function (match) {
    var string = new stringReader_1.default(match[1]);
    var _loop_1 = function () {
        var characters = new stringReader_1.default(string.read(numberOfUniqueCharacters));
        if (string.isEOL()) {
            return "break";
        }
        characters.readUntil(function (c) { return characters.string.lastIndexOf(c) > characters.position; });
        if (characters.isEOL()) {
            return "break";
        }
        string.position -= numberOfUniqueCharacters - 1;
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
