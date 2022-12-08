const utils = require("../utils/utils.js");
const parseFile = utils.parseFile;

main();

function main() {
	let sum = 0;
	const elfCalories = [];
	parseFile(
		"input.txt",
		/[0-9]*/,
		match => {
			const line = match[0];

			if (line.length == 0) {
				elfCalories.push(sum);
				sum = 0;
			} else {
				sum += parseInt(line);
			}
		},
		result => {
      const sortedElfs = utils.sortArrayDesc(elfCalories);
      console.log(sortedElfs);
      console.log(sortedElfs[0] + sortedElfs[1] + sortedElfs[2]);
		}
	);
}
