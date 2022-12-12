import Grid from "../utils/grid";
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
let knots: Position[] = [
	headPosition,
	headPosition,
	headPosition,
	headPosition,
	headPosition,
	headPosition,
	headPosition,
	headPosition,
	headPosition,
];

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
				: knots.find(k => k == position)
				? (knots.indexOf(position) + 1).toString()
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
	for (let index = 0; index < knots.length; index++) {
		const knot = knots[index];
		const knotToFollow = index == 0 ? headPosition : knots[index - 1];
		if (index == knots.length - 1) {
			knot.visited = true;
		}

		const adjacentItems = map.getAdjacentItems(knot.column, knot.row);
		if (adjacentItems.find(p => p == knotToFollow) || knotToFollow == knot) {
			// We don´t need to move
			return;
		}

		const dCol = knotToFollow.column - knot.column;
		const dRow = knotToFollow.row - knot.row;
		if (dCol != 0 && dRow != 0) {
			// Handle diagonal
			if (dCol > 0 && dRow > 0) {
				knots[index] = map.getItemAt(knot.column + 1, knot.row + 1);
			} else if (dCol < 0 && dRow > 0) {
				knots[index] = map.getItemAt(knot.column - 1, knot.row + 1);
			} else if (dCol < 0 && dRow < 0) {
				knots[index] = map.getItemAt(knot.column - 1, knot.row - 1);
			} else if (dCol > 0 && dRow < 0) {
				knots[index] = map.getItemAt(knot.column + 1, knot.row - 1);
			}
		} else if (dCol > 0) {
			// Going right
			knots[index] = map.getItemAt(knot.column + 1, knot.row);
		} else if (dCol < 0) {
			// Going left
			knots[index] = map.getItemAt(knot.column - 1, knot.row);
		} else if (dRow > 0) {
			// Going down
			knots[index] = map.getItemAt(knot.column, knot.row + 1);
		} else if (dRow < 0) {
			// Going up
			knots[index] = map.getItemAt(knot.column, knot.row - 1);
		}
	}
}
