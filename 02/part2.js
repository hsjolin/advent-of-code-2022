const utils = require("../utils/utils.js");
const parseFile = utils.parseFile;

main();

function main() {
	let sum = 0;
	const mapper = {};
	mapper["A"] = "rock";
	mapper["B"] = "paper";
	mapper["C"] = "scissors";
	mapper["X"] = "lose";
	mapper["Y"] = "draw";
	mapper["Z"] = "win";

	const calculatePoints = (they, me) => {
		console.log(they, me);
		let score = me == "rock" ? 1 : me == "paper" ? 2 : 3;
		if (me === they) {
			return score + 3;
		}

		if (
			(me === "rock" && they === "scissors") ||
			(me === "scissors" && they === "paper") ||
			(me == "paper" && they === "rock")
		) {
			return score + 6;
		}

		return score;
	};

	const calculateDraw = (outcome, they) => {
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

	parseFile(
		"input.txt",
		/([ABC]{1}) ([XYZ]{1})/,
		match => {
			const they = mapper[match[1]];
			const me = calculateDraw(mapper[match[2]], they);
			return calculatePoints(they, me);
		},
		result => {
			console.log(result.reduce((a, b) => a + b, 0));
		}
	);
}
