import {Injectable} from '@angular/core';
import {AppConfig} from "../../shared/configuration/appConfig";
import * as io from "socket.io-client";
import {AppMessageTypes} from "../../shared/enums/AppMessageTypes"
import {AppStatus} from "../../shared/models/AppStatus";
import {GameService} from "./GameService";
import {AppStates} from "../../shared/enums/AppStates";

@Injectable()
export class AppService {
	private socket: SocketIO.Socket;

	constructor(private gameService: GameService) {
		this.socket = io.connect(AppConfig.appServerAddress);
		this.socket.on(AppMessageTypes.Status, (appStatus: AppStatus) => this.handleAppMessages(appStatus));
	}

	private handleAppMessages(appStatus: AppStatus): void {
		console.log(appStatus.status);
		if (appStatus.status === AppStates.PartnerFound) {
			this.gameService.startGame(this.socket);
		}
	}
}