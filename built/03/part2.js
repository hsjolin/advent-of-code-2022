"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var group = null;
utils_1.Utils.lineReader("src/03/input.txt", /([A-Za-z]+)/, function (match) {
    var str = match[1];
    if (!group) {
        group = {
            rucksack1: null,
            rucksack2: null,
            rucksack3: null
        };
    }
    if (!group.rucksack1) {
        group.rucksack1 = str;
    }
    else if (!group.rucksack2) {
        group.rucksack2 = str;
    }
    else {
        group.rucksack3 = str;
    }
    if (group.rucksack1 && group.rucksack2 && group.rucksack3) {
        var priority = calculatePriority(group);
        group = null;
        return priority;
    }
    return null;
}, function (result) {
    console.log(result, result.reduce(function (a, b) { return a + b; }, 0));
    console.log("Finished");
});
function calculatePriority(group) {
    for (var i = 0; i < group.rucksack1.length; i++) {
        var match = group.rucksack2.match(group.rucksack1[i]);
        if (match) {
            match = group.rucksack3.match(group.rucksack1[i]);
            if (match) {
                return letters.indexOf(group.rucksack1[i]) + 1;
            }
        }
    }
}
