import Grid from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
let map = new Grid<Tree>();
let y = 0;

interface Coord {
	x: number;
	y: number;
}

interface Tree extends Coord {
	height: number;
	visible: boolean;
}

Utils.lineReader<number>(
	"src/08/input.txt",
	/^(\d+)$/,
	match => {
		const row = match[1];
		for (let x = 0; x < row.length; x++) {
			const tree: Tree = { x, y, height: parseInt(row[x]), visible: false };
			map.set(x, y, tree);
		}
		y++;

		return null;
	},
	result => {
		let visibleTrees = getVisibleTrees();
		answer = visibleTrees.length;

		map.print(t =>
			t.visible ? `[${t.height}]` : ` ${t.height} `
		);
		console.log(`Visible trees: ${answer}`);
	}
);

function getVisibleTrees(): Tree[] {
	for (let i = 0; i < map.rows; i++) {
		const row = map.getRowAt(i);
		let maxHeight = Math.max(...row.map(t => t.height));

		let height = -1;
		for (let i = 0; i < row.length; i++) {
			if (row[i].height == maxHeight) {
				row[i].visible = true;
				break;
			}

			if (row[i].height > height) {
				height = row[i].height;
				row[i].visible = true;
			}
		}
		
		height = -1;
		for (let i = row.length - 1; i > 0; i--) {
			if (row[i].height == maxHeight) {
				row[i].visible = true;
				break;
			}

			if (row[i].height > height) {
				height = row[i].height;
				row[i].visible = true;
			}
		}
	}

	for (let i = 0; i < map.columns; i++) {
		const column = map.getColumnAt(i);
		let maxHeight = Math.max(...column.map(t => t.height));

		let height = -1;
		for (let i = 0; i < column.length; i++) {
			if (column[i].height == maxHeight) {
				column[i].visible = true;
				break;
			}

			if (column[i].height > height) {
				height = column[i].height;
				column[i].visible = true;
			}
		}

		height = -1;
		for (let i = column.length - 1; i > 0; i--) {
			if (column[i].height == maxHeight) {
				column[i].visible = true;
				break;
			}

			if (column[i].height > height) {
				height = column[i].height;
				column[i].visible = true;
			}
		}
	}
	
	return map.filter(t => t.visible);
}
