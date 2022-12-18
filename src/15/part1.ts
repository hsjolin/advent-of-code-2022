import { Grid, GridNode } from "../utils/grid";
import { Utils } from "../utils/utils";
import { Interval } from "../utils/interval";

let answer = 0;
const line = 2000000;
const map = new Grid<Point>();
const intervals: Interval[] = [];
let beaconsOnLine: Point[] = [];

interface Point extends GridNode {
	closestBeacon: Point;
	name: string;
}

Utils.lineReader<Point>(
	"src/15/input.txt",
	/Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/,
	match => {
		const sensor: Point = {
			column: parseInt(match[1]),
			row: parseInt(match[2]),
			name: "S",
			closestBeacon: {
				column: parseInt(match[3]),
				row: parseInt(match[4]),
				name: "B",
				closestBeacon: null,
			},
		};

		// console.log(`Adding item at ${sensor.column}, ${sensor.row}`);
		map.set(sensor.column, sensor.row, sensor);
		map.set(
			sensor.closestBeacon.column,
			sensor.closestBeacon.row,
			sensor.closestBeacon
		);

		calculateAnswer(sensor);
		// console.log(`Calculating coverage for ${sensor.column}, ${sensor.row}`);
		// calculateCoverage(sensor);

		return sensor;
	},
	result => {
		// map.print(s => (s.name ? s.name : "."));
		// answer = map.getRowAt(10).filter(i => i.name == "#").length;
		// answer = map.getRowAt(2000000).filter(i => i.name == "#").length;
		answer = intervals.map(i => i.size()).reduce((a, b) => a + b) - beaconsOnLine.length;

		console.log(answer);
	}
);

function calculateCoverage(sensor: Point) {
	const cDistance = Math.abs(sensor.column - sensor.closestBeacon.column);
	const rDistance = Math.abs(sensor.row - sensor.closestBeacon.row);
	const distance = cDistance + rDistance;

	for (let dRow = -distance; dRow < distance + 1; dRow++) {
		const columnCount = distance - Math.abs(dRow);
		for (let dColumn = -columnCount; dColumn < columnCount + 1; dColumn++) {
			const row = sensor.row - dRow;
			const column = sensor.column - dColumn;

			let item = map.getItemAt(column, row);
			if (item == null) {
				item = {
					closestBeacon: null,
					column: column,
					row: row,
					name: "#",
				};
				map.set(column, row, item);
			} else {
				item.name = item.name == null || item.name == "." ? "#" : item.name;
			}
		}
	}
}

function calculateAnswer(sensor: Point) {
	const manhattanReachDistance =
		Math.abs(sensor.column - sensor.closestBeacon.column) +
		Math.abs(sensor.row - sensor.closestBeacon.row);

	const distanceToLine = Math.abs(sensor.row - line);

	if (distanceToLine > manhattanReachDistance) {
		return;
	}

	const columnCount = manhattanReachDistance * 2 + 1 - distanceToLine * 2;
	console.log(
		`Sensor ${sensor.column}, ${sensor.row} (distance to line: ${distanceToLine}) overlaps line with`,
		columnCount,
		"columns"
	);

	const interval = new Interval(
		sensor.column - Math.floor(columnCount / 2),
		sensor.column + Math.floor(columnCount / 2)
	);

	if (sensor.closestBeacon.row == line
		&& !beaconsOnLine.find(b => b.column == sensor.closestBeacon.column)) {
		beaconsOnLine.push(sensor.closestBeacon);
	}

	const existingIntervals = intervals.filter(i => i.intersects(interval));
	for (let i = 0; i < existingIntervals.length; i++) {
		const existingInterval = existingIntervals[i];
		interval.join(existingInterval);
		intervals.splice(intervals.indexOf(existingInterval), 1);
	}

	intervals.push(interval);
}
