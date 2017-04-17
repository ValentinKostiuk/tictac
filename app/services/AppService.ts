import {Injectable} from '@angular/core';
import {AppConfig} from "../../shared/configuration/appConfig";
import * as io from "socket.io-client";
import {AppMessageTypes} from "../../shared/enums/AppMessageTypes"
import {AppStatus} from "../../shared/models/AppStatus";
import {GameService} from "./GameService";
import {AppStates} from "../../shared/enums/AppStates";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {
	private socket: SocketIO.Socket;

	private appStateSource = new Subject<AppStates>();
	public appStateSource$: Observable<AppStates> = this.appStateSource.asObservable();

	constructor(private gameService: GameService) {
		this.socket = io.connect(AppConfig.appServerAddress);
		this.socket.on(AppMessageTypes.Status, (appStatus: AppStatus) => this.handleAppMessages(appStatus));
	}

	private handleAppMessages(appStatus: AppStatus): void {
		if (appStatus.status === AppStates.PartnerFound) {
			this.gameService.startGame(this.socket);
		}
		
		this.appStateSource.next(appStatus.status);
	}
}