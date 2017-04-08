import {CellStates} from "../enums/CellStates"
import {IPlayer} from "../interfaces/IPlayer";
import {GameField} from "./GameField";
import {FieldToFieldModel} from "../converters/FieldToFieldModel";
import {Coordinates} from '../models/Coordinates'
import {MakeMove} from "../models/MakeMove";
import * as Chalk from "chalk";

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

	private processValidMoveResult(coordinates: Coordinates): void {

		this.field.saveMove(coordinates, this.activePlayer.type);

		let oppositePlayer = this.getOppositePlayer(this.activePlayer);
		let fieldState = this.field.getFieldState();

		if (fieldState === CellStates.empty) {
			this.activePlayer = oppositePlayer;
			this.pushFieldToPlayers();
			this.iterateGame();
		} else {
			this.activePlayer.pushGameStatus();
		}
	}

	private iterateGame(): void {

		let fieldModel = FieldToFieldModel.convert(this.field);
		let makeMoveModel = new MakeMove(fieldModel);
		let makeMovePromise = this.activePlayer.makeMove(makeMoveModel);

		makeMovePromise.then(coordinates => {

			if(this.field.isCellValidForMove(coordinates)) {
				this.processValidMoveResult(coordinates);
				console.log(Chalk.green('Valid'));
			} else {
				console.log(Chalk.red('Invalid'));
				this.iterateGame();
			}
		})
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