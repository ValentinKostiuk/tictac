import {Injectable} from '@angular/core';
import {Field} from "../../shared/models/Field";
import {GameMessageTypes} from "../../shared/enums/GameMessageTypes";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Coordinates} from "../../shared/models/Coordinates";
import {MakeMove} from "../../shared/models/MakeMove";
import {PlayerSettings} from "../../shared/models/PlayerSettings";

@Injectable()
export class GameService {
	private socket: SocketIO.Socket;

	private fieldSource = new Subject<Field>();
	public fieldSource$: Observable<Field> = this.fieldSource.asObservable();

	private makeMoveSource = new Subject<boolean>();
	public makeMoveSource$: Observable<boolean> = this.makeMoveSource.asObservable();

	private playerSettingsSource = new Subject<PlayerSettings>();
	public playerSettingsSource$: Observable<PlayerSettings> = this.playerSettingsSource.asObservable();

	public startGame(socket: SocketIO.Socket): void {
		this.socket = socket;
		this.subscribeConnectionEvents();
	}

	public moveMade(coordinates: Coordinates): void{
		this.socket.emit(GameMessageTypes.MoveResult, coordinates);
	}

	private handleFieldState(field: Field): void {
		this.fieldSource.next(field);
	}

	private handlePlayerSettings(playerSettings: PlayerSettings): void {
		this.playerSettingsSource.next(playerSettings);
	}

	private handleMakeMove(makeMove: MakeMove): void {
		this.fieldSource.next(makeMove.field);
		this.makeMoveSource.next(true);
	}

	private subscribeConnectionEvents(): void {
		this.socket.on(GameMessageTypes.FieldState, (field: Field) => this.handleFieldState(field));
		this.socket.on(GameMessageTypes.MakeMove, (makeMove: MakeMove) => this.handleMakeMove(makeMove));
		this.socket.on(GameMessageTypes.PlayerSettings, (playerSettings: PlayerSettings) => this.handlePlayerSettings(playerSettings));
	}
}