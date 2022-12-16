import { Grid } from "../utils/grid";
import { Utils } from "../utils/utils";

interface Position {
	row: number;
	column: number;
	visited: boolean;
}

type Direction = "R" | "U" | "L" | "D";

let answer = 0;
const map = new Grid<Position>();
const mapSize = 600;

initMap();

let headPosition: Position = map.getItemAt(mapSize / 2, mapSize / 2);
let tailPosition: Position = headPosition;
const startPosition: Position = headPosition;

Utils.lineReader<string>(
	"src/09/input.txt",
	/^([RULD]) (\d+)$/,
	match => {
		const direction = match[1] as Direction;
		const steps = parseInt(match[2]);

		for (let i = 0; i < steps; i++) {
			walk(direction);
		}
		return `Walked ${steps} steps ${direction}`;
	},
	result => {
		map.print(position =>
			position == headPosition
				? "H"
				: position == tailPosition
				? "T"
				: position == startPosition
				? "S"
				: position.visited
				? "#"
				: "."
		);

		answer = map.filter(p => p.visited).length;
		console.log(`Answer: ${answer}`);
	}
);

function initMap() {
	for (let row = 0; row < mapSize; row++) {
		for (let column = 0; column < mapSize; column++) {
			map.set(column, row, { row, column, visited: false });
		}
	}
}

function walk(direction: Direction) {
	switch (direction) {
		case "D":
			headPosition = map.getItemAt(headPosition.column, headPosition.row + 1);
			break;
		case "U":
			headPosition = map.getItemAt(headPosition.column, headPosition.row - 1);
			break;
		case "L":
			headPosition = map.getItemAt(headPosition.column - 1, headPosition.row);
			break;
		case "R":
			headPosition = map.getItemAt(headPosition.column + 1, headPosition.row);
			break;
	}

	calculateTailPosition();
}

function calculateTailPosition() {
	tailPosition.visited = true;

	const adjacentItems = map.getAdjacentItems(
		tailPosition.column,
		tailPosition.row
	);
	if (
		adjacentItems.find(p => p == headPosition) ||
		headPosition == tailPosition
	) {
		// We don´t need to move
		return;
	}

	const dCol = headPosition.column - tailPosition.column;
	const dRow = headPosition.row - tailPosition.row;
	if (dCol != 0 && dRow != 0) {
		// Handle diagonal
		if (dCol > 0 && dRow > 0) {
			tailPosition = map.getItemAt(tailPosition.column + 1, tailPosition.row + 1);
		} else if (dCol < 0 && dRow > 0) {
			tailPosition = map.getItemAt(tailPosition.column - 1, tailPosition.row + 1);
		} else if (dCol < 0 && dRow < 0) {
			tailPosition = map.getItemAt(tailPosition.column - 1, tailPosition.row - 1);
		} else if (dCol > 0 && dRow < 0) {
			tailPosition = map.getItemAt(tailPosition.column + 1, tailPosition.row - 1);
		}
	} else if (dCol > 0) {
		// Going right
		tailPosition = map.getItemAt(tailPosition.column + 1, tailPosition.row);
	} else if (dCol < 0) {
		// Going left
		tailPosition = map.getItemAt(tailPosition.column - 1, tailPosition.row);
	} else if (dRow > 0) {
		// Going down
		tailPosition = map.getItemAt(tailPosition.column, tailPosition.row + 1);
	} else if (dRow < 0) {
		// Going up
		tailPosition = map.getItemAt(tailPosition.column, tailPosition.row - 1);
	}
}
