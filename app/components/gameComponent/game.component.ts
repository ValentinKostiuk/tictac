import {Component} from '@angular/core';
import {GameService} from "../../services/GameService";
import {Field} from "../../../shared/models/Field";
import {Coordinates} from "../../../shared/models/Coordinates";

@Component({
	selector: 'game',
	templateUrl: "./app/components/gameComponent/game.component.html"
})

export class GameComponent {
	private field: Field;

	constructor(private gameService: GameService) {
		gameService.fieldSource$.subscribe((field: Field) => this.updateField(field));
	}

	public updateField(field: Field) {
		if (!this.field) {
			this.field = field;

		} else {
			for (let i = 0; i < this.field.fieldSize; i++) {
				for (let j = 0; j < this.field.fieldSize; j++) {
					if (this.field.cells[i][j].state !== field.cells[i][j].state) {
						this.field.cells[i][j].state = field.cells[i][j].state;
					}
				}
			}
		}
	}

	public onMoveMade (coordinates: Coordinates): void {
		this.gameService.moveMade(coordinates);
	}
}
