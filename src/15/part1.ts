import { Grid, GridNode } from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
const map = new Grid<Point>();

interface Point extends GridNode {
	closestBeacon: Point;
	name: string;
	isCovered: boolean;
}

Utils.lineReader<Point>(
	"src/15/input.txt",
	/Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/,
	match => {
		const sensor: Point = {
			column: parseInt(match[1]),
			row: parseInt(match[2]),
			name: "S",
			isCovered: false,
			closestBeacon: {
				column: parseInt(match[3]),
				row: parseInt(match[4]),
				name: "B",
				closestBeacon: null,
				isCovered: false,
			},
		};

		map.set(sensor.column, sensor.row, sensor);
		map.set(
			sensor.closestBeacon.column,
			sensor.closestBeacon.row,
			sensor.closestBeacon
		);

		const coveredPoints: Point[] = getCoverage(sensor);
		coveredPoints.forEach(point => {
			let existingPoint = map.getItemAt(point.column, point.row);
			if (existingPoint == null) {
				existingPoint = point;
			} else {
				existingPoint.isCovered;
			}
		});
		return sensor;
	},
	result => {
		map.print(s => (s.name ?? s.isCovered ? "#" : "."));
		console.log(answer);
	}
);

function getCoverage(sensor: Point): Point[] {
	const coveredPoints: Point[] = [];
	const cDistance = Math.abs(sensor.column - sensor.closestBeacon.column);
	const rDistance = Math.abs(sensor.row - sensor.closestBeacon.row);

	for (let row = sensor.row - rDistance; row < sensor.row + rDistance; row++) {
		for (
			let column = sensor.column - cDistance;
			column < sensor.column + cDistance;
			column++
		) {
			let item: Point = map.getItemAt(column, row);
			if (item == null) {
				item = {
					column,
					row,
					closestBeacon: null,
					isCovered: true,
					name: ".",
				};
			}

			item.isCovered = true;
			map.set(item.column, item.row, item);
			coveredPoints.push(item);
		}
	}

	return coveredPoints;
}
