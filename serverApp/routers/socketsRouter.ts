'use strict';
import Socket = SocketIO.Socket;
import Server = SocketIO.Server;
import {GameApp} from "../classes/GameApp";

module.exports = function (server: Server, io) {

	io.on('connection', function (socket: Socket) {
		let gameApp = new GameApp();
		gameApp.handleConnection(socket);
	});

};