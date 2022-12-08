import { Utils } from "../utils/utils";

const letters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

Utils.lineReader<number>(
	"src/03/input.txt",
	/([A-Za-z]+)/,
	match => {
		const str = match[1];
		const part1 = str.substring(0, str.length / 2);
		const part2 = str.substring(str.length / 2);

		return calculatePriority(part1, part2);
	},
	result => {
		console.log(
			result,
			result.reduce((a, b) => a + b, 0)
		);
		console.log("Finished");
	}
);

function calculatePriority(part1: string, part2: string): number {
	for (let i = 0; i < part1.length; i++) {
		const match = part2.match(part1[i]);
		if (match) {
			return letters.indexOf(part1[i]) + 1;
		}
	}
}
