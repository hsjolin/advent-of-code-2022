import { Utils } from "../utils/utils";

interface Pair {
	numbers1: number[];
	numbers2: number[];
	overlaps: boolean;
}

Utils.lineReader<Pair>(
	"src/04/input.txt",
	/(\d+)-(\d+),(\d+)-(\d+)/,
	match => {
		const number1 = parseInt(match[1]);
		const number2 = parseInt(match[2]);
		const number3 = parseInt(match[3]);
		const number4 = parseInt(match[4]);
		const numbers1 = Utils.interval(number1, number2 + 1);
		const numbers2 = Utils.interval(number3, number4 + 1);

		const pair = {
			numbers1: numbers1,
			numbers2: numbers2,
			overlaps:
				numbers1.length >= numbers2.length
					? number1 <= number3 && number2 >= number4
					: number3 <= number1 && number4 >= number2,
		};

		return pair;
	},
	result => {
		console.log(
			result.filter(pair => pair.overlaps).length
		);
		console.log("Finished");
	}
);
