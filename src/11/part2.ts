import { Utils } from "../utils/utils";

let answer = 0;

const monkeys: Monkey[] = [];

interface Monkey {
	items: number[];
	operation: (old: number) => number;
	test: (worryLevel: number) => boolean;
	divideBy: number;
	isMultiply: boolean;
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
		const isMultiply = match[3] ? match[3].includes("*") : null;
		const test = match[4]
			? (eval(`(worryLevel) => worryLevel % ${match[4]} == 0`) as (
					worryLevel: number
			  ) => boolean)
			: null;
		const divideBy = match[4] ? parseInt(match[4]) : null;
		const ifTrueThrowToMonkey = match[5] == "true" ? parseInt(match[6]) : null;
		const ifFalseThrowToMonkey = match[5] == "false" ? parseInt(match[6]) : null;

		currentMonkey.items = startingItems ?? currentMonkey.items;
		currentMonkey.operation = operation ?? currentMonkey.operation;
		currentMonkey.test = test ?? currentMonkey.test;
		currentMonkey.ifTrueThrowToMonkey =
			ifTrueThrowToMonkey ?? currentMonkey.ifTrueThrowToMonkey;
		currentMonkey.ifFalseThrowToMonkey =
			ifFalseThrowToMonkey ?? currentMonkey.ifFalseThrowToMonkey;
		currentMonkey.divideBy = divideBy != null ? divideBy : currentMonkey.divideBy;
		currentMonkey.isMultiply =
			isMultiply != null ? isMultiply : currentMonkey.isMultiply;

		if (monkeyNumber != null) {
			currentMonkey.inspectCount = 0;
			monkeys[monkeyNumber] = currentMonkey;
		}

		if (
			currentMonkey.items &&
			currentMonkey.operation &&
			currentMonkey.test &&
			currentMonkey.ifTrueThrowToMonkey != null &&
			currentMonkey.ifFalseThrowToMonkey != null &&
			currentMonkey.divideBy != null
		) {
			currentMonkey = null;
		}

		return null;
	},
	result => {
		const numberOfRounds = 10000;
		for (let round = 0; round < numberOfRounds; round++) {
			if (executeRound(round) == false) {
				console.log(`Stopped prematurely at round ${round + 1}`);
				printResult(round + 1);
				break;
			}
		}

		const sortedInspectCounts = monkeys
			.sort((a, b) => b.inspectCount - a.inspectCount)
			.map(m => m.inspectCount);
		printResult(numberOfRounds);

		const top1 = sortedInspectCounts[0];
		const top2 = sortedInspectCounts[1];

		answer = top1 * top2;
		console.log(`Answer: ${answer}`);
	}
);

function executeRound(round: number): boolean {
	for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
		const monkey = monkeys[monkeyIndex];
		for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
			let item = monkey.items[itemIndex];
			if (monkey.operation(item) == Infinity) {
				return false;
			}

			item = monkey.operation(item);
			if (monkey.isMultiply) {
				item = normalizeValue(item);
			}

			if (monkey.test(item)) {
				monkeys[monkey.ifTrueThrowToMonkey].items.push(item);
			} else {
				monkeys[monkey.ifFalseThrowToMonkey].items.push(item);
			}

			monkey.inspectCount++;
		}
		monkey.items = [];
	}

	if ((round + 1) % 1000 == 0) {
		printResult(round + 1);
	}

	return true;
}

function monkeyString(monkey: Monkey, index: number): string {
	return `Monkey ${index}: ${monkey.inspectCount}.}`;
}

function printResult(round: number) {
	console.log(
		`\r\nAfter round ${round}:\r\n${monkeys
			.map((m, i) => monkeyString(m, i))
			.join("\r\n")}`
	);
}

function normalizeValue(item: number): number {
	const divisibleProduct = monkeys.map(m => m.divideBy).reduce((a, b) => a * b);
	return item % divisibleProduct;
}
