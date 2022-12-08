var utils = require("../utils/utils.js");
var parseFile = utils.parseFile;
main();
function main() {
    var sum = 0;
    var elfCalories = [];
    parseFile("input.txt", /[0-9]*/, function (match) {
        var line = match[0];
        if (line.length == 0) {
            elfCalories.push(sum);
            sum = 0;
        }
        else {
            sum += parseInt(line);
        }
    }, function (result) {
        console.log(Math.max.apply(Math, elfCalories));
    });
}
