import {Injectable} from '@angular/core';
import {Field} from "../../shared/models/Field";
import {GameMessageTypes} from "../../shared/enums/GameMessageTypes";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Coordinates} from "../../shared/models/Coordinates";

@Injectable()
export class GameService {
	private socket: SocketIO.Socket;

	private fieldSource = new Subject<Field>();
	public fieldSource$: Observable<Field> = this.fieldSource.asObservable();

	public startGame(socket: SocketIO.Socket): void {
		this.socket = socket;
		console.info("StartingGame");
		this.subscribeConnectionEvents();
	}

	public moveMade(coordinates: Coordinates): void{
		this.socket.emit(GameMessageTypes.MoveResult, coordinates);
	}

	private handleFieldState(field: Field): void {
		this.fieldSource.next(field);
	}

	private subscribeConnectionEvents(): void {
		this.socket.on(GameMessageTypes.FieldState, (field: Field) => this.handleFieldState(field));
	}
}