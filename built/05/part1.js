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
/*
[T]             [P]     [J]
[F]     [S]     [T]     [R]     [B]
[V]     [M] [H] [S]     [F]     [R]
[Z]     [P] [Q] [B]     [S] [W] [P]
[C]     [Q] [R] [D] [Z] [N] [H] [Q]
[W] [B] [T] [F] [L] [T] [M] [F] [T]
[S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
[Q] [Q] [B] [D] [J] [W] [H] [R] [J]
 1   2   3   4   5   6   7   8   9
*/
var stacks = [
    { crates: ["Q", "S", "W", "C", "Z", "V", "F", "T"] },
    { crates: ["Q", "R", "B"] },
    { crates: ["B", "Z", "T", "Q", "P", "M", "S"] },
    { crates: ["D", "V", "F", "R", "Q", "H"] },
    { crates: ["J", "G", "L", "D", "B", "S", "T", "P"] },
    { crates: ["W", "R", "T", "Z"] },
    { crates: ["H", "Q", "M", "N", "S", "F", "R", "J"] },
    { crates: ["R", "N", "F", "H", "W"] },
    { crates: ["J", "Z", "T", "Q", "P", "R", "B"] },
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
    console.log(result[result.length - 1].map(function (s) { return s.crates[s.crates.length - 1]; }).join(""));
    console.log("Finished");
});
function executeDirection(direction) {
    for (var i = 0; i < direction.count; i++) {
        stacks[direction.to].crates.push(stacks[direction.from].crates.pop());
    }
}
