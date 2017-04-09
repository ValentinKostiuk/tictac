import {CellStates} from "../enums/CellStates";
import {SocketPlayer} from "./SocketPlayer";
import {Game} from "./Game";

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
			socket.emit('status', {status: 'waiting for pair'});

		} else {
			let partnerSocket = this.waitingForPair.pop();
			partnerSocket.emit('status', {status: 'partner found'});
			socket.emit('status', {status: 'partner found'});  //TODO: move to app messages enum ~
			console.log('partner found passing sockets to game');
			let player1 = new SocketPlayer(CellStates.cross, partnerSocket);
			let player2 = new SocketPlayer(CellStates.nought, socket);
			let game = new Game(player1, player2);
		}
	}
}