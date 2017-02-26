import {CellStates} from '../classes/CellStates'
import {GameField} from '../classes/GameField'
export interface IPlayer {
	new (playerType : CellStates);
	makeMove (/*TODO: implement move info class*/) : Promise<any>;
	pushField (field : GameField): void;
	pushGameStatus (): void;
}