export default class Grid<T> {
	private map: T[][] = [];

	rows: number = 0;
	columns: number = 0;

	getColumnAt(index: number): T[] {
		if (this.map.length == 0) {
			return null;
		}

		if (index >= this.map[0].length) {
			return null;
		}

		const col: T[] = [];
		for (let i = 0; i < this.map.length; i++) {
			col.push(this.map[i][index]);
		}

		return col;
	}

	getRowAt(index: number): T[] {
		if (index >= this.map.length) {
			return null;
		}

		return this.map[index];
	}

	getItemAt(column: number, row: number): T {
		if (row >= this.map.length) {
			return null;
		}

		if (column >= this.map[0].length) {
			return null;
		}

		return this.map[row][column];
	}

	set(column: number, row: number, value: T) {
		while (row >= this.map.length) {
			this.map.push([]);
		}

		this.map[row][column] = value;
		this.columns = this.map[row].length;
		this.rows = this.map.length;
	}

	find(func: (arg: T) => boolean): T {
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				if (func(this.map[y][x])) {
					return this.map[y][x];
				}
			}
		}

		return null;
	}

	filter(func: (arg: T) => boolean): T[] {
		const result: T[] = [];
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				if (func(this.map[y][x])) {
					result.push(this.map[y][x]);
				}
			}
		}

		return result;
	}

	print(func: (arg: T) => string) {
		for (let y = 0; y < this.map.length; y++) {
			console.log(this.map[y].map(i => func(i)).join(""));
		}
	}
}
