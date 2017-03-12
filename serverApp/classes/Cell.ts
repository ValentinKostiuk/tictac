import {CellStates} from "../enums/CellStates"

export class Cell {
	public state : CellStates;

	constructor (state: CellStates = CellStates.empty){
		this.state = state;
	}
}