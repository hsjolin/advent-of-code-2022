import { Utils } from "../utils/utils";

let answer = 0;

const monkeys: Monkey[] = [];

interface Monkey {
	items: number[];
	operation: (old: number) => number;
	test: (worryLevel: number) => boolean;
	ifTrueThrowToMonkey: number;
	ifFalseThrowToMonkey: number;
	inspectCount: number;
}

let currentMonkey: Monkey = null;

Utils.lineReader<Monkey>(
	"src/11/input.txt",
	/^(?:Monkey (\d+):)|(?:  Starting items: ((?:\d+,? ?)+))|(?:  Operation: new = (.*))|(?:  Test: divisible by (\d+))|(?:    If ((?:true)|(?:false)): throw to monkey (\d+))$/,
	match => {
		currentMonkey = currentMonkey ?? ({} as Monkey);
		const monkeyNumber = match[1] ? parseInt(match[1]) : null;
		const startingItems = match[2] ? (eval(`[${match[2]}]`) as number[]) : null;
		const operation = match[3]
			? (eval(`(old) => ${match[3]}`) as (worryLevel: number) => number)
			: null;
		const test = match[4]
			? (eval(`(worryLevel) => worryLevel % ${match[4]} == 0`) as (
					worryLevel: number
			  ) => boolean)
			: null;
		const ifTrueThrowToMonkey = match[5] == "true" ? parseInt(match[6]) : null;
		const ifFalseThrowToMonkey = match[5] == "false" ? parseInt(match[6]) : null;

		currentMonkey.items = startingItems ?? currentMonkey.items;
		currentMonkey.operation = operation ?? currentMonkey.operation;
		currentMonkey.test = test ?? currentMonkey.test;
		currentMonkey.ifTrueThrowToMonkey =
			ifTrueThrowToMonkey ?? currentMonkey.ifTrueThrowToMonkey;
		currentMonkey.ifFalseThrowToMonkey =
			ifFalseThrowToMonkey ?? currentMonkey.ifFalseThrowToMonkey;

		if (monkeyNumber != null) {
			currentMonkey.inspectCount = 0;
			monkeys[monkeyNumber] = currentMonkey;
		}

		if (
			currentMonkey.items &&
			currentMonkey.operation &&
			currentMonkey.test &&
			currentMonkey.ifTrueThrowToMonkey != null &&
			currentMonkey.ifFalseThrowToMonkey != null
		) {
			currentMonkey = null;
		}

		return null;
	},
	result => {
		for (let round = 0; round < 20; round++) {
			executeRound(round);
		}
		const sortedInspectCounts = monkeys
			.sort((a, b) => b.inspectCount - a.inspectCount)
			.map(m => m.inspectCount);
		answer = sortedInspectCounts[0] * sortedInspectCounts[1];
		console.log(`Answer: ${answer}`);
	}
);

function executeRound(round: number) {
	for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
		const monkey = monkeys[monkeyIndex];
		for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
			let item = monkey.items[itemIndex];
			item = monkey.operation(item);
			item = Math.floor(item / 3);

			if (monkey.test(item)) {
				monkeys[monkey.ifTrueThrowToMonkey].items.push(item);
			} else {
				monkeys[monkey.ifFalseThrowToMonkey].items.push(item);
			}

			monkey.inspectCount++;
		}
		monkey.items = [];
	}

	console.log(
		`\r\nAfter round ${round + 1}:\r\n${monkeys
			.map((m, i) => monkeyString(m, i))
			.join("\r\n")}`
	);
}

function monkeyString(monkey: Monkey, index: number): string {
	return `Monkey ${index}: ${monkey.items.join(", ")}`;
}
