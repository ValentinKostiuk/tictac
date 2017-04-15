import {CellStates} from "../../shared/enums/CellStates";
import {AppMessageTypes} from "../../shared/enums/AppMessageTypes";
import {AppStates} from "../../shared/enums/AppStates";
import {SocketPlayer} from "./SocketPlayer";
import {Game} from "./Game";
import {AppStatus} from "../../shared/models/AppStatus";

export class GameApp {

	private static appInstance: GameApp;

	private waitingForPair: SocketIO.Socket[] = [];

	constructor() {
		if (GameApp.appInstance) {
			return GameApp.appInstance;
		}
		GameApp.appInstance = this;
	}

	public handleConnection(socket: SocketIO.Socket): void {

		if (this.waitingForPair.length === 0) {
			this.waitingForPair.push(socket);
			socket.emit(AppMessageTypes.Status, {
				status: AppStates.WaitingForPartner
			});

		} else {
			let partnerSocket = this.waitingForPair.pop();

			let partnerStatus = new AppStatus();
			partnerStatus.status = AppStates.PartnerFound;

			partnerSocket.emit(AppMessageTypes.Status, {
				status: AppStates.PartnerFound
			});

			let status = new AppStatus();
			status.status = AppStates.PartnerFound;

			socket.emit(AppMessageTypes.Status, status);

			let player1 = new SocketPlayer(CellStates.cross, partnerSocket);
			let player2 = new SocketPlayer(CellStates.nought, socket);

			let game = new Game(player1, player2);
		}
	}
}