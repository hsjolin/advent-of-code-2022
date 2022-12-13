import { Utils } from "../utils/utils";

let answer = 0;
type Command = "noop" | "addx";
const cycles: number[] = [0];
let xRegister = 1;

Utils.lineReader<string>(
	"src/10/input.txt",
	/^(noop|addx) ?(-?\d+)?$/,
	match => {
		const command = match[1] as Command;
		const param = match[2] ? parseInt(match[2]) : null;
		
		switch (command) {
			case "addx":
				cycles.push(0);
				cycles.push(param);
				break;
			case "noop":
				cycles.push(0);
				break;
		}

		return `Command: ${command} Parameter: ${param}`;
	},
	result => {
		// console.log(result);
		console.log("Cycles", cycles.length);
		for (let i = 1; i < cycles.length; i++) {
			
			if (i == 20 || (i - 20) % 40 == 0) {
				const signalStrength = xRegister * i; 
				console.log(i, signalStrength);
				answer += signalStrength;
			}
			
			xRegister += cycles[i];
			//console.log(i, xRegister);
		}

		console.log(`Answer: ${answer}`);
	}
);

