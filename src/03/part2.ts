import { Utils } from "../utils/utils";

const letters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
interface Group {
	rucksack1: string;
	rucksack2: string;
	rucksack3: string;
}

let group: Group = null;

Utils.lineReader<number>(
	"src/03/input.txt",
	/([A-Za-z]+)/,
	match => {
		const str = match[1];
		if (!group) {
			group = {
				rucksack1: null,
				rucksack2: null,
				rucksack3: null
			};
		}
		
		if (!group.rucksack1) {
			group.rucksack1 = str;
		} else if (!group.rucksack2) {
			group.rucksack2 = str;
		} else {
			group.rucksack3 = str;
		}
		
		if (group.rucksack1 && group.rucksack2 && group.rucksack3) {
			const priority = calculatePriority(group);
			group = null;
			return priority;
		}

		return null;
	},
	result => {
		console.log(
			result,
			result.reduce((a, b) => a + b, 0)
		);
		console.log("Finished");
	}
);

function calculatePriority(group: Group): number {
	for (let i = 0; i < group.rucksack1.length; i++) {
		let match = group.rucksack2.match(group.rucksack1[i]);
		if (match) {
			match = group.rucksack3.match(group.rucksack1[i]);
			if (match) {
				return letters.indexOf(group.rucksack1[i]) + 1;
			}
		}
	}
}
