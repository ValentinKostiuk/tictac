import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Field} from "../../../shared/models/Field";
import {Cell} from "../../../shared/models/Cell";
import {Coordinates} from "../../../shared/models/Coordinates";
import {CellStates} from "../../../shared/enums/CellStates";

@Component({
	selector: 'field',
	templateUrl: "./app/components/fieldComponent/field.component.html"
})

export class FieldComponent {
	@Input() field: Field;

	@Output() onMoveMade = new EventEmitter<Coordinates>();

	public onCellClicked(cell: Cell): void {
		if (cell.state === CellStates.empty) {
			let cellCoordinates = this.getCoordinatesOfClickedCell(cell);
			this.onMoveMade.emit(cellCoordinates);
		}
	}

	private getCoordinatesOfClickedCell(cell: Cell): Coordinates {
		let result = new Coordinates();

		for (let i = 0; i < this.field.fieldSize; i++) {
			for (let j = 0; j < this.field.fieldSize; j++) {
				if (this.field.cells[i][j] === cell) {
					result.x = i;
					result.y = j;
				}
			}
		}

		return result;
	}
}
