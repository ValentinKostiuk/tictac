import {CellStates} from '../enums/CellStates'
import {IPlayer} from '../interfaces/IPlayer'
import {GameField} from "./GameField";

export class SocketPlayer implements IPlayer {
	public playerType: CellStates;
	private socket;

	constructor(playerType: CellStates, socket: SocketIO.Socket) {
		this.socket = socket;
		this.playerType = playerType;
	}

	makeMove() {
		return new Promise(function () {
		});
	}

	pushField(field: GameField) {
		this.socket.emit('fieldState', {field: field});
		console.log('field state sent');
	}

	pushGameStatus() {
	}
}