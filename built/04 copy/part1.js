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
var utils_1 = require("../utils/utils");
var stacks = [
    { crates: ["Z", "N"] },
    { crates: ["M", "C", "D"] },
    { crates: ["P"] },
];
console.log(stacks);
utils_1.Utils.lineReader("src/05/input.txt", /move (\d+) from (\d+) to (\d+)/, function (match) {
    if (match.length < 3) {
        return null;
    }
    var direction = {
        count: parseInt(match[1]),
        from: parseInt(match[2]) - 1,
        to: parseInt(match[3]) - 1,
    };
    executeDirection(direction);
    return stacks.map(function (s) {
        return { crates: __spreadArray([], s.crates, true) };
    });
}, function (result) {
    result.forEach(function (stack) {
        console.log(stack);
    });
    console.log(result[result.length - 1]
        .map(function (s) { return s.crates[s.crates.length - 1]; })
        .join(""));
    console.log("Finished");
});
function executeDirection(direction) {
    console.log(direction);
    for (var i = 0; i < direction.count; i++) {
        stacks[direction.to].crates.push(stacks[direction.from].crates.pop());
    }
}
