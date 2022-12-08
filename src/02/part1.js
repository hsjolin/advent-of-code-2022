const utils = require("../utils/utils.js");
const parseFile = utils.parseFile;

main();

function main() {
	let sum = 0;
	const mapper = {};
	mapper["A"] = "rock";
	mapper["B"] = "paper";
	mapper["C"] = "scissors";
	mapper["X"] = "rock";
	mapper["Y"] = "paper";
	mapper["Z"] = "scissors";

	const calculatePoints = (they, me) => {
		console.log(they, me);
		let score = me == "rock" ? 1 : me == "paper" ? 2 : 3;
		if (me === they) {
			return score + 3;
		}

		if (me === "rock" && they === "scissors"
			|| me === "scissors" && they === "paper"
			|| me == "paper" && they === "rock")
		{
			return score + 6;
		}
		
		return score;
	};

	parseFile(
		"input.txt",
		/([ABC]{1}) ([XYZ]{1})/,
		match => {
			const they = mapper[match[1]];
			const me = mapper[match[2]];
			return calculatePoints(they, me);
		},
		result => {
			console.log(result.reduce((a, b) => a + b, 0));
		}
	);
}
