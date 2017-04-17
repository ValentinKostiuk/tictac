import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cell} from "../../../shared/models/Cell";

@Component({
	selector: 'cell',
	templateUrl: "./app/components/cellComponent/cell.component.html",
	styleUrls: ['./app/components/cellComponent/cell.component.css']
})

export class CellComponent {

	@Input() cell: Cell;

	@Output() onCellClicked = new EventEmitter<Cell>();

	private cellClicked() {
		this.onCellClicked.emit(this.cell);
	}
}
