import {CellStates} from "../../shared/enums/CellStates"
import {Field} from "../../shared/models/Field";
import {Coordinates} from "../../shared/models/Coordinates";
import {MakeMove} from "../../shared/models/MakeMove";
import {GameStatus} from "../../shared/models/GameStatus";
export interface IPlayer {
	type: CellStates;
	makeMove (model: MakeMove) : Promise<Coordinates>;
	pushField (field : Field): void;
	pushGameStatus (gameStatus: GameStatus): void;
}