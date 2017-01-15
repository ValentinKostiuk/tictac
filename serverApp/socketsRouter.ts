'use strict';

let waitingForPair = [];
let connectedToGame = [];

module.exports = function (server, io) {
	io.on('connection', function (socket) {

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
			socket.emit('status', {status: 'partner found'});
			console.log('partner found passing sockets to game');
		}
		connectedToGame.push(connectedToGame);
	});
};