var utils = require("../utils/utils.js");
var parseFile = utils.parseFile;
main();
function main() {
    var sum = 0;
    var mapper = {};
    mapper["A"] = "rock";
    mapper["B"] = "paper";
    mapper["C"] = "scissors";
    mapper["X"] = "lose";
    mapper["Y"] = "draw";
    mapper["Z"] = "win";
    var calculatePoints = function (they, me) {
        console.log(they, me);
        var score = me == "rock" ? 1 : me == "paper" ? 2 : 3;
        if (me === they) {
            return score + 3;
        }
        if ((me === "rock" && they === "scissors") ||
            (me === "scissors" && they === "paper") ||
            (me == "paper" && they === "rock")) {
            return score + 6;
        }
        return score;
    };
    var calculateDraw = function (outcome, they) {
        if (outcome === "draw") {
            return they;
        }
        switch (they) {
            case "rock":
                switch (outcome) {
                    case "lose":
                        return "scissors";
                    case "win":
                        return "paper";
                }
            case "paper":
                switch (outcome) {
                    case "lose":
                        return "rock";
                    case "win":
                        return "scissors";
                }
            case "scissors":
                switch (outcome) {
                    case "lose":
                        return "paper";
                    case "win":
                        return "rock";
                }
        }
    };
    parseFile("input.txt", /([ABC]{1}) ([XYZ]{1})/, function (match) {
        var they = mapper[match[1]];
        var me = calculateDraw(mapper[match[2]], they);
        return calculatePoints(they, me);
    }, function (result) {
        console.log(result.reduce(function (a, b) { return a + b; }, 0));
    });
}
