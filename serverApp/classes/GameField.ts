import {Cell} from './Cell'
import {CellStates} from './CellStates'

export class GameField {
	public cells: Cell[][];
	private scores: number[];
	private fieldSize: number;

	public constructor(fieldSize: number = 3) {

		for (let i = 0; i < fieldSize; i++) {
			for (let j = 0; j < fieldSize; j++) {
				this.cells[i][j] = new Cell();
			}
		}

		this.fieldSize = fieldSize;
		this.scores = Array.apply(null, Array(2 * fieldSize + 2)).map(Number.prototype.valueOf, 0);
	}

	public makeMove(x: number, y: number, playerMark: CellStates): void {
		let point = playerMark === CellStates.cross ? 1 : -1;
		this.cells[x][y].state = playerMark;

		this.scores[x] += point;

		this.scores[this.fieldSize + y] += point;

		if (x == y) {
			this.scores[2 * this.fieldSize] += point;
		}

		if (this.fieldSize - 1 - y == x) {
			this.scores[2 * this.fieldSize + 1] += point;
		}
	}

	public getFieldState (): CellStates {
		let length = 2 * this.fieldSize + 2;
		for (let i = 0; i < length; i += 1) {
			if (Math.abs(this.scores[i]) === this.fieldSize) {
				return this.scores[i] > 0 ? CellStates.cross : CellStates.nought;
			}
		}
		return CellStates.empty;
	}
}