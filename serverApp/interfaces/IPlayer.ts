import {CellStates} from '../enums/CellStates'
import {GameField} from '../classes/GameField'
import {Field} from "../models/Field";
export interface IPlayer {
	type: CellStates;
	makeMove (/*TODO: implement move info class*/) : Promise<any>;
	pushField (field : Field): void;
	pushGameStatus (): void;
}