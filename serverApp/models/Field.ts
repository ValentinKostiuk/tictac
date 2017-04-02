import {Cell} from '../classes/Cell'

export class Field {//TODO: extract Cell model
	public cells: Cell[][];
	public fieldSize: number;

	public constructor() {
		this.cells = [];
	}
}