import {CellStates} from '../../shared/enums/CellStates'
import {IPlayer} from '../interfaces/IPlayer'
import {Field} from "../../shared/models/Field";
import {Coordinates} from "../../shared/models/Coordinates";
import {GameMessageTypes} from "../../shared/enums/GameMessageTypes";
import {PlayerSettings} from "../../shared/models/PlayerSettings";

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
			socket.emit(GameMessageTypes.MakeMove, model);
			socket.once(GameMessageTypes.MoveResult, (coordinates: Coordinates) => {
				resolve(coordinates);
			})
		});
	}

	public pushField(field: Field): void {
		this.socket.emit(GameMessageTypes.FieldState, field);
	}

	public pushGameStatus(): void {
		this.socket.emit(GameMessageTypes.GameState, {
			state: "winner"
		});
	}

	private pushPlayerSettings(settings: PlayerSettings): void {
		this.socket.emit(GameMessageTypes.PlayerSettings, settings);
	}
}