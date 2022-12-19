import { Dijkstras, DijkstrasNode } from "../utils/dijkstras";
import { Grid } from "../utils/grid";
import { Utils } from "../utils/utils";

let answer = 0;
const numberOfMinutes = 30;
let openValves: Valve[] = [];

let column = 0;
let row = 0;

const grid = new Grid<Valve>();
const dijkstras = new Dijkstras(grid);
dijkstras.setAdjacentSelector(currentNode =>
	currentNode.destinations.map(destinatioName =>
		grid.find(n => n.name == destinatioName)
	)
);

interface Valve extends DijkstrasNode {
	name: string;
	rate: number;
	destinations: string[];
	open: boolean;
}

interface RatedValve {
	rating: number;
	valve: Valve;
	path: Valve[];
}

Utils.lineReader<Valve>(
	"src/16/input.txt",
	/Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? ((?:[A-Z],? ?)+)/,
	match => {
		const valveName = match[1];
		const valveRate = parseInt(match[2]);
		const destinations = match[3].split(", ");

		const valve = {
			name: valveName,
			rate: valveRate,
			destinations: destinations,
			open: false,
			explored: false,
			column,
			row,
			distance: 1,
			sourceNode: null,
			totalDistance: Number.MAX_SAFE_INTEGER,
		};

		grid.set(column, row++, valve);
		return valve;
	},
	valves => {
		let currentValve = valves.find(v => v.name == "AA");
		let currentPlan: Valve[] = [];
		let nextValve: Valve = null;

		for (let minute = 0; minute < numberOfMinutes; minute++) {
			console.log(`== Minute ${minute + 1} ==`);
			if (openValves.length == 0) {
				console.log("No valves are open");
			} else {
				console.log(
					`Valve ${openValves.map(v => v.name).join(" and ")} ${
						openValves.length == 1 ? "is" : "are"
					} open, releasing ${openValves
						.map(v => v.rate)
						.reduce((a, b) => a + b)} pressure.`
				);
			}
			if (currentPlan.length == 0) {
				const ratedValve = calculatePlan(currentValve);
				if (ratedValve == null) {
					console.log("Nothing more to do. Going to sleep...\r\n");
					break;
				}

				currentPlan = ratedValve.path;
			}

			nextValve = currentPlan.splice(0, 1)[0];

			
			if (currentPlan.length) {
				console.log(`You open valve ${currentValve.name}\r\n`);
				currentValve.open = true;
				openValves.push(currentValve);
			} else 
				console.log(`You move to valve ${currentValve.name}\r\n`);
			
			currentValve = nextValve;
		}

		answer = 0;
		console.log("Answer", answer);
	}
);

function calculatePlan(currentValve: Valve): RatedValve {
	const nodes = grid.filter(n => !n.open && n.rate > 0);
	if (nodes == null) {
		return null;
	}

	let nextValve: RatedValve = null;
	nodes.forEach(n => {
		const path = dijkstras
			.findShortestPath(currentValve, n)
			.filter(n => n != currentValve);
		const rating = n.rate - path.length;
		if (nextValve == null || nextValve.rating < rating) {
			nextValve = { rating, valve: n, path };
		}
	});

	return nextValve;
}
