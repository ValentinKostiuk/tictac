'use strict';
import Socket = SocketIO.Socket;
import Server = SocketIO.Server;
import {Game} from './classes/Game'
import {SocketPlayer} from "./classes/SocketPlayer";
import {CellStates} from "./enums/CellStates";

let waitingForPair = [];
let connectedToGame = [];

module.exports = function (server : Server, io) {
	io.on('connection', function (socket: Socket) {

		if(~connectedToGame.indexOf(socket)){
			console.log('already connected ignoring');
			return;
		}

		if(waitingForPair.length === 0){
			waitingForPair.push(socket);
			socket.emit('status', {status: 'waiting for pair'});
			console.log('added waiter');
		} else {
			let partnerSocket = waitingForPair.pop();
			partnerSocket.emit('status', {status: 'partner found'});
			socket.emit('status', {status: 'partner found'});  //TODO: move to app messages enum ~
			console.log('partner found passing sockets to game');
			var player1 = new SocketPlayer(CellStates.cross, partnerSocket);
			var player2 = new SocketPlayer(CellStates.nought, socket);
			var game = new Game(player1, player2);
		}
		connectedToGame.push(connectedToGame);
	});
};