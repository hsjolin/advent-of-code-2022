import { Utils } from "../utils/utils";

interface Stack {
	crates: string[];
}

interface Direction {
	count: number;
	from: number;
	to: number;
}

/*
[T]             [P]     [J]        
[F]     [S]     [T]     [R]     [B]
[V]     [M] [H] [S]     [F]     [R]
[Z]     [P] [Q] [B]     [S] [W] [P]
[C]     [Q] [R] [D] [Z] [N] [H] [Q]
[W] [B] [T] [F] [L] [T] [M] [F] [T]
[S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
[Q] [Q] [B] [D] [J] [W] [H] [R] [J]
 1   2   3   4   5   6   7   8   9 
*/

const stacks: Stack[] = [
	{ crates: ["Q", "S", "W", "C", "Z", "V", "F", "T"] },
	{ crates: ["Q", "R", "B"] },
	{ crates: ["B", "Z", "T", "Q", "P", "M", "S"] },
	{ crates: ["D", "V", "F", "R", "Q", "H"] },
	{ crates: ["J", "G", "L", "D", "B", "S", "T", "P"] },
	{ crates: ["W", "R", "T", "Z"] },
	{ crates: ["H", "Q", "M", "N", "S", "F", "R", "J"] },
	{ crates: ["R", "N", "F", "H", "W"] },
	{ crates: ["J", "Z", "T", "Q", "P", "R", "B"] },
];

console.log(stacks);

Utils.lineReader<Stack[]>(
	"src/05/input.txt",
	/move (\d+) from (\d+) to (\d+)/,
	match => {
		if (match.length < 3) {
			return null;
		}

		const direction: Direction = {
			count: parseInt(match[1]),
			from: parseInt(match[2]) - 1,
			to: parseInt(match[3]) - 1,
		};

		executeDirection(direction);
		return stacks.map(s => {
			return { crates: [...s.crates] };
		});
	},
	result => {
		console.log(
			result[result.length - 1].map(s => s.crates[s.crates.length - 1]).join("")
		);

		console.log("Finished");
	}
);
function executeDirection(direction: Direction) {
	for (let i = 0; i < direction.count; i++) {
		stacks[direction.to].crates.push(stacks[direction.from].crates.pop());
	}
}
