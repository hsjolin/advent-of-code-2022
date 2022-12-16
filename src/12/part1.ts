import { Djikstras, DjikstrasNode } from "../utils/djikstras";
import { Grid } from "../utils/grid";
import { Utils } from "../utils/utils";

let row = 0;
const alphabet = "abcdefghijklmnopqrstuvxyz";
const grid = new Grid<DjikstrasNode>();
const djikstras = new Djikstras(grid);
let startNode: DjikstrasNode = null;
let endNode: DjikstrasNode = null;

Utils.lineReader<string>(
	"src/12/input.txt",
	/^([SEa-z]+)$/,
	match => {
		const str = match[1];
		for (let i = 0; i < str.length; i++) {
			const chr = str[i];
			const height = alphabet.indexOf(chr);

			if (height >= 0) {
				grid.set(i, row, {
					column: i,
					row: row,
					distance: height,
					explored: false,
					sourceNode: null,
					totalDistance: 99999999,
				});
			} else if (chr == "S") {
				startNode = {
					column: i,
					row: row,
					distance: 0,
					explored: false,
					sourceNode: null,
					totalDistance: 99999999,
				};

				grid.set(i, row, startNode);
			} else {
				endNode = {
					column: i,
					row: row,
					distance: alphabet.indexOf("z"),
					explored: false,
					sourceNode: null,
					totalDistance: 99999999,
				};

				grid.set(i, row, endNode);
			}
		}
		row++;

		return null;
	},
	_ => {
		const result = djikstras.findShortestPath(
			grid.find(n => n == startNode),
			grid.find(n => n == endNode)
		);

		grid.print(n => {
			const number = n.distance > 9 ? `${n.distance}` : `${n.distance} `;
			return result.includes(n) ? `[${number}]` : ` ${number} `;
    });
    
		// console.log(result);
		// console.log(`Answer: ${answer}`);
	}
);
