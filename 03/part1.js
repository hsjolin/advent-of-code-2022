const utils = require("../utils/utils.js");
const parseFile = utils.parseFile;

main();

function main() {
	let sum = 0;

	parseFile(
		"input.txt",
		/([A-Za-z]+)/,
		match => {
			const str = match[1];
			return {
				part1: str.substring(0, str.length / 2),
				part2: str.substring(str.length / 2)
			}
		},
		result => {
			console.log(result);
		}
	);
}
