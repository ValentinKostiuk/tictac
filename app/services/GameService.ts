import {Injectable} from '@angular/core';
import {Field} from "../../shared/models/Field";
import {GameMessageTypes} from "../../shared/enums/GameMessageTypes";

@Injectable()
export class GameService {
	private socket: SocketIO.Socket;

	public startGame(socket: SocketIO.Socket): void {
		this.socket = socket;
		console.info("StartingGame");
		this.subscribeConnectionEvents();
	}

	private handleFieldState(field: Field): void {
		console.log(field);
	}

	private subscribeConnectionEvents(): void {
		this.socket.on(GameMessageTypes.FieldState, (field: Field) => this.handleFieldState(field));
	}
}