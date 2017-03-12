import {CellStates} from "../enums/CellStates"
import {IPlayer} from "../interfaces/IPlayer";
import {GameField} from "./GameField";

export class Game {
	public player1: IPlayer;
	public player2: IPlayer;
	public field: GameField;

	constructor (player1: IPlayer, player2: IPlayer){
		this.player1 = player1;
		this.player2 = player2;
		this.field = new GameField();

		this.pushFieldToPlayers();
	}

	private pushFieldToPlayers (): void {
		console.log('PUSHING HARD');
		this.player1.pushField(this.field);
		this.player2.pushField(this.field);
	}
}