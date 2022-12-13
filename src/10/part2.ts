import Grid from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
type Command = "noop" | "addx";
const cycles: number[] = [];
let xRegister = 1;

const crt = new Grid<string>();

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
		for (let i = 0; i < cycles.length; i++) {
			const row = Math.floor(i / 40);
			const col = i - row * 40;
			
			const sprite = [xRegister - 1, xRegister, xRegister + 1];

			// console.log("Row", row, "Col", col, "Sprite", xRegister);

			if (sprite.includes(i - row * 40)) {
				crt.set(col, row, "#");
			} else {
				crt.set(col, row, ".");
			}

			xRegister += cycles[i];
		}

		crt.print(s => s);

		console.log(`Answer: ${answer}`);
	}
);
