import {CellStates} from "../enums/CellStates"
import {IPlayer} from "../interfaces/IPlayer";
import {GameField} from "./GameField";
import {FieldToFieldModel} from "../converters/FieldToFieldModel";
import {Coordinates} from '../models/Coordinates'

export class Game {
	public player1: IPlayer;
	public player2: IPlayer;
	public field: GameField;
	private activePlayer: IPlayer;

	constructor(player1: IPlayer, player2: IPlayer) {
		this.player1 = player1;
		this.player2 = player2;
		this.field = new GameField();
		this.activePlayer = player1;

		this.pushFieldToPlayers();
		this.iterateGame();
	}

	private processMoveResult(coordinates: Coordinates): void {
		console.log('got coords', coordinates);
		this.field.makeMove(coordinates, this.activePlayer.type);
		let oppositePlayer = this.getOppositePlayer(this.activePlayer);
		let fieldState = this.field.getFieldState();
		console.log(fieldState);
		if (fieldState === CellStates.empty) {
			this.activePlayer = oppositePlayer;
			this.pushFieldToPlayers();
			this.iterateGame();
		} else {
			console.log("ALTERNATE REALITY");
			this.activePlayer.pushGameStatus();
		}
	}

	private iterateGame(): void {
		console.log('iteration', this.activePlayer.type);
		let makeMovePromise = this.activePlayer.makeMove();
		makeMovePromise.then(coordinates => this.processMoveResult(coordinates))
	}

	private pushFieldToPlayers(): void {
		let fieldModel = FieldToFieldModel.convert(this.field);
		this.player1.pushField(fieldModel);
		this.player2.pushField(fieldModel);
	}

	private getOppositePlayer(player: IPlayer): IPlayer {
		return player == this.player1 ? this.player2 : this.player1;
	}
}