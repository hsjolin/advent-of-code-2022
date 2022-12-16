import { Dijkstras, DijkstrasNode } from "../utils/dijkstras";
import { Grid } from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
let row = 0;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const grid = new Grid<Node>();
const dijkstras = new Dijkstras(grid);
let startNode: Node = null;
let endNode: Node = null;

interface Node extends DijkstrasNode {
	height: number;
}

Utils.lineReader<string>(
	"src/12/input.txt",
	/^([SEa-z]+)$/,
	match => {
		const str = match[1];
		for (let col = 0; col < str.length; col++) {
			const chr = str[col];
			const height =
				chr == "S" ? 0 : chr == "E" ? alphabet.indexOf("z") : alphabet.indexOf(chr);

			const node = {
				column: col,
				row: row,
				height: height,
				distance: 1,
				explored: false,
				sourceNode: null,
				totalDistance: Number.MAX_SAFE_INTEGER,
			};

			if (chr == "S") {
				startNode = node;
			}

			if (chr == "E") {
				endNode = node;
			}

			grid.set(col, row, node);
		}
		row++;

		return null;
	},
	_ => {
		const result = dijkstras.findShortestPath(
			startNode,
			endNode,
			(n, currentNode) =>
				(n.column == currentNode.column || n.row == currentNode.row) &&
				n.height - currentNode.height <= 1 
		);

		grid.print(n => {
			const number = n.height > 9 ? `${n.height}` : `${n.height} `;
			return result.includes(n) ? `[${number}]` : ` ${number} `;
		});

		// console.log(result);
		answer = result.length - 1;
		console.log(`Answer: ${answer}`);
	}
);
