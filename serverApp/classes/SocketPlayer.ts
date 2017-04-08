import {CellStates} from '../enums/CellStates'
import {IPlayer} from '../interfaces/IPlayer'
import {Field} from "../models/Field";
import {Coordinates} from "../models/Coordinates";
import {MessageTypes} from "../enums/MessageTypes";
import {PlayerSettings} from "../models/PlayerSettings";

export class SocketPlayer implements IPlayer {
	public type: CellStates;
	private socket: SocketIO.Socket;

	constructor(playerType: CellStates, socket: SocketIO.Socket) {
		this.socket = socket;
		this.type = playerType;

		let playerSettings = new PlayerSettings();
		playerSettings.type = playerType;

		this.pushPlayerSettings(playerSettings);
	}

	public makeMove(model): Promise<Coordinates> {
		let socket = this.socket;
		return new Promise(function (resolve: Function, reject: Function) {
			socket.emit(MessageTypes.MakeMove, model);
			socket.once(MessageTypes.MoveResult, (coordinates: Coordinates) => {
				resolve(coordinates);
			})
		});
	}

	public pushField(field: Field): void {
		this.socket.emit(MessageTypes.FieldState, field);
	}

	public pushGameStatus(): void {
		this.socket.emit(MessageTypes.GameState, {
			state: "winner"
		});
	}

	private pushPlayerSettings(settings: PlayerSettings): void {
		this.socket.emit(MessageTypes.PlayerSettings, settings);
	}
}