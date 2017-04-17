import {Component} from '@angular/core';
import {GameService} from "../../services/GameService";
import {Field} from "../../../shared/models/Field";
import {Coordinates} from "../../../shared/models/Coordinates";
import {PlayerSettings} from "../../../shared/models/PlayerSettings";

@Component({
	selector: 'game',
	templateUrl: "./app/components/gameComponent/game.component.html"
})

export class GameComponent {
	private field: Field;
	private moveAllowed: boolean;
	private playerSettings: PlayerSettings;

	constructor(private gameService: GameService) {
		gameService.fieldSource$.subscribe((field: Field) => this.updateField(field));
		gameService.makeMoveSource$.subscribe((allowed: boolean) => this.setAllowedToMakeMove(allowed));
		gameService.playerSettingsSource$.subscribe((playerSettings: PlayerSettings) => this.setPlayerSettings(playerSettings));
	}

	private updateField(field: Field) {
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

	private setAllowedToMakeMove(allowed: boolean): void {
		this.moveAllowed = true;
	}

	private setPlayerSettings(playerSettings: PlayerSettings): void {
		this.playerSettings = playerSettings;
	}

	public onMoveMade(coordinates: Coordinates): void {
		if(this.moveAllowed) {
			this.gameService.moveMade(coordinates);
			this.moveAllowed = false;
		}
	}
}
