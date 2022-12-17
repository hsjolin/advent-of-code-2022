import { Grid, GridNode } from "../utils/grid";
import { Utils } from "../utils/utils";

type Symbol = "." | "#" | "o" | "+";

interface Point extends GridNode {
	symbol: Symbol;
}

const sandSource: Point = {
	column: 500,
	row: 0,
	symbol: "+",
};

let rockBottom = 0;

const grid = new Grid<Point>();

let answer = 0;
let gridColumnsMax = 0;
let gridRowsMax = 0;
let gridColumnsMin = 0;
let gridRowsMin = 0;

Utils.lineReader<Point[]>(
	"src/14/input.txt",
	/^(.*)$/,
	match => {
		const str = match[1];
		const points = str.split(" -> ").map(s => {
			const pair = s.split(",").map(s => parseInt(s));
			return {
				column: pair[0],
				row: pair[1],
				symbol: ".",
			} as Point;
		});

		return points;
	},
	result => {
		initGrid(result);
		let continueSimulation = true;
		while (continueSimulation) {
			const sand: Point = {
				column: sandSource.column,
				row: sandSource.row - 1,
				symbol: "o",
			};

			while (true) {
				sand.row++;
				const reachedRockBottom = sand.row + 1 == rockBottom;
				let pointBelow = grid.getItemAt(sand.column, sand.row + 1) ?? {
					column: sand.column,
					row: sand.row + 1,
					symbol: reachedRockBottom ? "#" : ".",
				};
				pointBelow.symbol = pointBelow.symbol
					? pointBelow.symbol
					: reachedRockBottom
					? "#"
					: ".";
				grid.set(pointBelow.column, pointBelow.row, pointBelow);

				if ((pointBelow.symbol ?? ".") == ".") {
					continue;
				}

				let pointToTheLeft = grid.getItemAt(
					pointBelow.column - 1,
					pointBelow.row
				) ?? {
					column: pointBelow.column - 1,
					row: pointBelow.row,
					symbol: reachedRockBottom ? "#" : ".",
				};

				pointToTheLeft.symbol = pointToTheLeft.symbol
					? pointToTheLeft.symbol
					: reachedRockBottom
					? "#"
					: ".";

				grid.set(pointToTheLeft.column, pointToTheLeft.row, pointToTheLeft);

				let pointToTheRight = grid.getItemAt(
					pointBelow.column + 1,
					pointBelow.row
				) ?? {
					column: pointBelow.column + 1,
					row: pointBelow.row,
					symbol: reachedRockBottom ? "#" : ".",
				};
				pointToTheRight.symbol = pointToTheRight.symbol
					? pointToTheRight.symbol
					: reachedRockBottom
					? "#"
					: ".";
				grid.set(pointToTheRight.column, pointToTheRight.row, pointToTheRight);

				if (reachedRockBottom) {
					grid.set(sand.column, sand.row, sand);
					break;
				}

				if (pointToTheLeft.symbol == ".") {
					sand.column--;
					continue;
				}

				if (pointToTheRight.symbol == ".") {
					sand.column++;
					continue;
				}

				// At rest
				grid.set(sand.column, sand.row, sand);
				if (sand.row == sandSource.row) {
					continueSimulation = false;
				}

				break;
			}
		}

		grid.print(p => {
			return p.column >= gridColumnsMin - 200 ? p.symbol ?? "." : "";
		});

		answer = grid.filter(p => p.symbol == "o").length;
		console.log(answer);
	}
);

function initGrid(result: Point[][]) {
	const lines: Point[] = [];

	for (let i = 0; i < result.length; i++) {
		const points = result[i];
		for (let j = 1; j < points.length; j++) {
			const point1 = points[j - 1];
			const point2 = points[j];
			if (point1.column != point2.column) {
				// Horizontal line
				const startPoint = point1.column > point2.column ? point2 : point1;
				const endPoint = startPoint == point1 ? point2 : point1;
				const columnArray = Utils.interval(startPoint.column, endPoint.column + 1);

				for (let col = 0; col < columnArray.length; col++) {
					lines.push({
						column: columnArray[col],
						row: startPoint.row,
						symbol: "#",
					});
				}
			} else if (point1.row != point2.row) {
				// Vertical line
				const startPoint = point1.row > point2.row ? point2 : point1;
				const endPoint = startPoint == point1 ? point2 : point1;
				const rowArray = Utils.interval(startPoint.row, endPoint.row + 1);

				for (let row = 0; row < rowArray.length; row++) {
					lines.push({
						row: rowArray[row],
						column: startPoint.column,
						symbol: "#",
					});
				}
			}
		}
	}

	gridColumnsMax = Math.max(...lines.map(p => p.column));
	gridRowsMax = Math.max(...lines.map(p => p.row));
	gridColumnsMin = Math.min(...lines.map(p => p.column));
	gridRowsMin = Math.min(...lines.map(p => p.row));
	rockBottom = gridRowsMax + 2;

	for (let col = 0; col < gridColumnsMax + 1; col++) {
		for (let row = 0; row < rockBottom; row++) {
			grid.set(col, row, {
				column: col,
				row: row,
				symbol: ".",
			});
		}
	}

	for (let i = 0; i < lines.length; i++) {
		const linePoint = lines[i];
		grid.set(linePoint.column, linePoint.row, linePoint);
	}

	grid.set(sandSource.column, sandSource.row, sandSource);
}
