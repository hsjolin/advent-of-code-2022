export interface GridNode {
	row: number;
	column: number;
}

export class Grid<T extends GridNode> {
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
		if (row >= this.map.length || row < 0) {
			return null;
		}

		if (column >= this.map[0].length || column < 0) {
			return null;
		}

		return this.map[row][column];
	}

	set(column: number, row: number, value: T) {
		while (row >= this.rows) { 
			const rowArray = [];
			for (let colIndex = 0; colIndex < this.columns; colIndex++) {
				rowArray.push({column: colIndex, row: this.rows});
			}
			this.rows++;
			this.map.push(rowArray);
		}

		while (column >= this.columns) {
			for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
				this.map[rowIndex].push({ column: this.columns, row: rowIndex } as T);
			}
			this.columns++;
		}

		this.map[row][column] = value;
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

		this.map.forEach(row => {
			row.forEach(item => {
				if (func(item)) {
					result.push(item);
				}
			});
		});

		return result;
	}

	getAdjacentItems(column: number, row: number): T[] {
		return [
			this.getItemAt(column - 1, row - 1),
			this.getItemAt(column, row - 1),
			this.getItemAt(column + 1, row - 1),
			this.getItemAt(column - 1, row),
			this.getItemAt(column + 1, row),
			this.getItemAt(column - 1, row + 1),
			this.getItemAt(column, row + 1),
			this.getItemAt(column + 1, row + 1),
		].filter(item => item != null);
	}

	print(func: (arg: T) => string) {
		this.map.forEach(row => {
			console.log(row.map(i => func(i)).join(""));
		});
	}
}
