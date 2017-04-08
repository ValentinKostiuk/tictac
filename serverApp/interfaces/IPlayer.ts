import {CellStates} from '../enums/CellStates'
import {Field} from "../models/Field";
import {Coordinates} from "../models/Coordinates";
import {MakeMove} from "../models/MakeMove";
export interface IPlayer {
	type: CellStates;
	makeMove (model: MakeMove) : Promise<Coordinates>;
	pushField (field : Field): void;
	pushGameStatus (): void;
}