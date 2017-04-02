import {GameField} from '../classes/GameField'
import {Cell} from '../classes/Cell'
import {Field} from '../models/Field'

export class FieldToFieldModel {

	public static convert(gameField: GameField): Field {
		let result = new Field();
		result.fieldSize = gameField.cells.length;
		for (let i = 0; i < gameField.cells.length; i++) {

			result.cells[i] = [];

			for (let j = 0; j < gameField.cells[i].length; j++) {
				result.cells[i][j] = new Cell(gameField.cells[i][j].state);
			}
		}

		return result;
	}

}