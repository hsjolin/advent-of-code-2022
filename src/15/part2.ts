import { Grid, GridNode } from "../utils/grid";
import { Utils } from "../utils/utils";
import { Interval } from "../utils/interval";

let answer = 0;
let line = 0;
const map = new Grid<Point>();
let intervals: Interval[] = [];
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

		map.set(sensor.column, sensor.row, sensor);
		map.set(
			sensor.closestBeacon.column,
			sensor.closestBeacon.row,
			sensor.closestBeacon
		);


		return sensor;
	},
	result => {
		for (let i = 0; i < 4000000; i++, line++) {
			if (i % 100000 == 0) {
				console.log(`${i} rows processed.`);
			}
			for (let p = 0; p < result.length; p++) {
				calculateAnswer(result[p]);
			}

			if (intervals.length > 1) {
				printFoundGap();
			}

			intervals = [];
			beaconsOnLine = [];
		}

		console.log(answer);
	}
);

function calculateAnswer(sensor: Point) {
	const manhattanReachDistance =
		Math.abs(sensor.column - sensor.closestBeacon.column) +
		Math.abs(sensor.row - sensor.closestBeacon.row);

	const distanceToLine = Math.abs(sensor.row - line);

	if (distanceToLine > manhattanReachDistance) {
		return;
	}

	const columnCount = manhattanReachDistance * 2 + 1 - distanceToLine * 2;

	const interval = new Interval(
		sensor.column - Math.floor(columnCount / 2),
		sensor.column + Math.floor(columnCount / 2)
	);

	if (
		sensor.closestBeacon.row == line &&
		!beaconsOnLine.find(b => b.column == sensor.closestBeacon.column)
	) {
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

function printFoundGap() {
	console.log(`Found a gap in intervals at row ${line}`);
	const column = Math.max(...intervals.map(i => i.start)) - 1;
	const row = line;
	answer = column * 4000000 + row;
	console.log(intervals, "Column", column, "Row", row);
	console.log("Beacons", beaconsOnLine.length);
	console.log("Distress frequency", answer);
}

