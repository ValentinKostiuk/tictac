import {CellStates} from '../enums/CellStates'
import {GameField} from '../classes/GameField'
export interface IPlayer {
	//new (playerType : CellStates, socket?: Socket);
	makeMove (/*TODO: implement move info class*/) : Promise<any>;
	pushField (field : GameField): void;
	pushGameStatus (): void;
}