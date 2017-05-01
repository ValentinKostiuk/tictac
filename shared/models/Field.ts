import {Cell} from "./Cell"

export class Field {
	public cells: Cell[][];
	public fieldSize: number;

	public constructor() {
		this.cells = [];
	}
}