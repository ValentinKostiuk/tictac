import {Cell} from './Cell'

export class GameField {
	public cells: Cell[][];
	private scores: number[];

	constructor(fieldSize: number = 3) {

		for (let i = 0; i < fieldSize; i++) {
			for (let j = 0; j < fieldSize; j++) {
				this.cells[i][j] = new Cell();
			}
		}

		this.scores = Array.apply(null, Array(fieldSize + 2)).map(Number.prototype.valueOf, 0);
	}
}