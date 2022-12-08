"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var fs = require("fs");
var readLine = require("readline");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.interval = function (a, b, arr) {
        if (arr === void 0) { arr = null; }
        if (a > b) {
            throw "WTF!";
        }
        if (a == b) {
            return arr;
        }
        arr = arr || [];
        return Utils.interval(a + 1, b, __spreadArray(__spreadArray([], arr, true), [a], false));
    };
    ;
    Utils.lineReader = function (file, regex, lineCallback, completeCallback) {
        var fileStream = fs.createReadStream(file);
        var lineReader = readLine.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        var values = [];
        lineReader
            .on("line", function (line) {
            var match = line.match(regex);
            if (match) {
                var value = lineCallback(match);
                if (value) {
                    values.push(value);
                }
            }
        })
            .on("close", function () {
            completeCallback(values);
        });
    };
    return Utils;
}());
exports.Utils = Utils;
