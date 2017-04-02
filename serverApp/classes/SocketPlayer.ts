import {CellStates} from '../enums/CellStates'
import {IPlayer} from '../interfaces/IPlayer'
import {Field} from "../models/Field";
import {Coordinates} from "../models/Coordinates";

export class SocketPlayer implements IPlayer {
	public type: CellStates;
	private socket;

	constructor(playerType: CellStates, socket: SocketIO.Socket) {
		this.socket = socket;
		this.type = playerType;

		socket.emit('playerType', {playerType: playerType});
	}

	public makeMove() {
		let socket = this.socket;
		return new Promise(function (resolve: Function, reject: Function) {
			socket.emit('makeMove', {status: ''});
			socket.once('moveResult', (coordinates: Coordinates) => {
				resolve(coordinates);
			})
		});
	}

	public pushField(field: Field) {
		this.socket.emit('fieldState', {field: field});
		console.log('field state sent');
	}

	public pushGameStatus() {
		this.socket.emit('gameState', {
			state: "winner"
		});
	}
}