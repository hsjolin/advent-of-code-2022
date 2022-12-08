"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var fs = require("fs");
var readLine = require("readline");
var Utils = /** @class */ (function () {
    function Utils() {
    }
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
