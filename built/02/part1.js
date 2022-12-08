var utils = require("../utils/utils.js");
var parseFile = utils.parseFile;
main();
function main() {
    var sum = 0;
    var mapper = {};
    mapper["A"] = "rock";
    mapper["B"] = "paper";
    mapper["C"] = "scissors";
    mapper["X"] = "rock";
    mapper["Y"] = "paper";
    mapper["Z"] = "scissors";
    var calculatePoints = function (they, me) {
        console.log(they, me);
        var score = me == "rock" ? 1 : me == "paper" ? 2 : 3;
        if (me === they) {
            return score + 3;
        }
        if (me === "rock" && they === "scissors"
            || me === "scissors" && they === "paper"
            || me == "paper" && they === "rock") {
            return score + 6;
        }
        return score;
    };
    parseFile("input.txt", /([ABC]{1}) ([XYZ]{1})/, function (match) {
        var they = mapper[match[1]];
        var me = mapper[match[2]];
        return calculatePoints(they, me);
    }, function (result) {
        console.log(result.reduce(function (a, b) { return a + b; }, 0));
    });
}
